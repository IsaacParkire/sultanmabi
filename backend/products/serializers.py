from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    meat_type_display = serializers.CharField(source='get_meat_type_display', read_only=True)
    storage_type_display = serializers.CharField(source='get_storage_type_display', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_id', 'description',
            'price', 'stock', 'available', 'created_at', 'updated_at',
            'image', 'meat_type', 'meat_type_display', 'storage_type',
            'storage_type_display', 'weight', 'is_featured'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
        extra_kwargs = {
            'price': {'min_value': 0},
            'stock': {'min_value': 0},
            'weight': {'min_value': 0}
        }

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock cannot be negative")
        return value