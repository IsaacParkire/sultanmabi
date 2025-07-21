from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.sessions.backends.db import SessionStore
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemWriteSerializer
from products.models import Product
from orders.models import Order, OrderItem
import uuid

class CartPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        return request.user.is_authenticated or request.session.session_key

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [CartPermission]
    lookup_field = 'id'

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Cart.objects.filter(user=self.request.user, is_active=True)
        elif self.request.session.session_key:
            return Cart.objects.filter(session_key=self.request.session.session_key, is_active=True)
        return Cart.objects.none()

    def get_object(self):
        if not self.request.session.session_key:
            self.request.session.create()
            self.request.session.save()

        if self.request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(
                user=self.request.user,
                is_active=True,
                defaults={'session_key': self.request.session.session_key}
            )
            # Merge any existing guest cart
            guest_cart = Cart.objects.filter(
                session_key=self.request.session.session_key,
                is_active=True
            ).exclude(user=self.request.user).first()
            if guest_cart:
                cart.merge_with(guest_cart)
        else:
            cart, _ = Cart.objects.get_or_create(
                session_key=self.request.session.session_key,
                is_active=True,
                defaults={'user': None}
            )
        return cart

    @action(detail=True, methods=['post'])
    def add_item(self, request, id=None):
        cart = self.get_object()
        serializer = CartItemWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        if product.stock < quantity:
            return Response(
                {"error": "Not enough stock available"},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return Response(self.get_serializer(cart).data)

    @action(detail=True, methods=['post'])
    def checkout(self, request, id=None):
        cart = self.get_object()
        
        # Validate cart
        if not cart.items.exists():
            return Response(
                {"error": "Cannot checkout empty cart"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verify stock for all items
        out_of_stock = []
        for item in cart.items.all():
            if item.product.stock < item.quantity:
                out_of_stock.append({
                    "product": item.product.name,
                    "available": item.product.stock,
                    "requested": item.quantity
                })
        
        if out_of_stock:
            return Response(
                {"error": "Some items are out of stock", "details": out_of_stock},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create order
        order = Order.objects.create(
            customer=cart.user if cart.user else None,
            shipping_address=request.data.get('shipping_address'),
            contact_phone=request.data.get('contact_phone'),
            notes=request.data.get('notes', ''),
            total_price=cart.total_price,
            payment_completed=False
        )
        
        # Create order items
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
            # Reduce stock
            item.product.stock -= item.quantity
            item.product.save()
        
        # Deactivate cart
        cart.is_active = False
        cart.save()
        
        # Create new empty cart
        new_cart = Cart.objects.create(
            user=cart.user,
            session_key=cart.session_key
        )
        
        return Response({
            "message": "Order created successfully",
            "order_id": order.id,
            "total_price": order.total_price
        })