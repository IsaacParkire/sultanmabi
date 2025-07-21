from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price']
        extra_kwargs = {
            'price': {'read_only': True}
        }

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    customer = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'created_at', 'updated_at', 
            'status', 'status_display', 'total_price',
            'shipping_address', 'contact_phone', 'notes',
            'payment_completed', 'items'
        ]
        read_only_fields = ['total_price', 'payment_completed']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        total_price = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            price = product.price  # Get current price from product
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=price
            )
            total_price += price * quantity
        
        order.total_price = total_price
        order.save()
        return order