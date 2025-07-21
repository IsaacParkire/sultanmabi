from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

def api_root(request):
    return JsonResponse({
        "message": "Welcome to Sultanmabi API",
        "endpoints": {
            "admin": "/admin/",
            "api_docs": "/api/docs/",
            "products": "/api/products/",
            "orders": "/api/orders/",
            "users": "/api/users/",
            "carts": "/api/carts/",
            "payments": "/api/payments/",
            "token": "/api/token/",
            "token_refresh": "/api/token/refresh/",
            "token_verify": "/api/token/verify/",
        }
    })

# Schema view for API documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Sultanmabi API",
        default_version='v1',
        description="API documentation for Sultanmabi E-commerce",
        terms_of_service="https://www.sultanmabi.com/terms/",
        contact=openapi.Contact(email="api@sultanmabi.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # API Root
    path('api/', api_root, name='api-root'),
    
    # Admin Panel
    path('admin/', admin.site.urls),
    
    # API Documentation
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # Apps
    path('api/products/', include('products.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/users/', include('users.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/carts/', include('carts.urls')),
    
    # Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # Health Check
    path('api/health/', include('health_check.urls')),
]

# Media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)