from .models import Product, Category
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProductSerializer, CategorySerializer
from .filters import ProductFilter

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_products = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def update_stock(self, request, slug=None):
        product = self.get_object()
        quantity = request.data.get('quantity')
        
        if quantity is None:
            return Response(
                {"error": "Quantity is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            quantity = int(quantity)
        except ValueError:
            return Response(
                {"error": "Quantity must be an integer"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        product.stock += quantity
        product.save()
        return Response(
            {"message": f"Stock updated. New stock: {product.stock}"},
            status=status.HTTP_200_OK
        )