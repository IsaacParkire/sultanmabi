from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer
from users.permissions import IsOwnerOrAdmin

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(customer=user)

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status not in [Order.PENDING, Order.PROCESSING]:
            return Response(
                {'error': 'Cannot cancel order in current status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.status = Order.CANCELLED
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
