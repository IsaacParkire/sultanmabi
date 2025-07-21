from rest_framework import serializers
from products.serializers import ProductSerializer
from .models import Cart, CartItem

class CartItemWriteSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['product_id', 'quantity']
        extra_kwargs = {
            'quantity': {'min_value': 1}
        }

class CartItemReadSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'added_at', 'total_price']
        read_only_fields = fields

    def get_total_price(self, obj):
        return obj.total_price

class CartSerializer(serializers.ModelSerializer):
    items = CartItemReadSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'id', 'user', 'session_key', 'created_at', 'updated_at',
            'is_active', 'items', 'total_price', 'total_items'
        ]
        read_only_fields = fields

    def get_total_price(self, obj):
        return obj.total_price

    def get_total_items(self, obj):
        return obj.total_items