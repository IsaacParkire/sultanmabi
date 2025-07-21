import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')
    meat_type = django_filters.CharFilter(field_name="meat_type")
    storage_type = django_filters.CharFilter(field_name="storage_type")
    available = django_filters.BooleanFilter(field_name="available")
    featured = django_filters.BooleanFilter(field_name="is_featured")

    class Meta:
        model = Product
        fields = ['category', 'min_price', 'max_price', 'meat_type', 
                 'storage_type', 'available', 'featured']