from django.shortcuts import redirect
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet

router = DefaultRouter()
router.register(r'carts', CartViewSet, basename='cart')

urlpatterns = [
    path('', lambda request: redirect('/api/docs/')),

    path('', include(router.urls)),
]