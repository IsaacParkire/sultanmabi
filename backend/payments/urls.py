from django.shortcuts import redirect
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet
from .webhooks import mpesa_callback

router = DefaultRouter()
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', lambda request: redirect('/api/docs/')),

    path('', include(router.urls)),
    
    # M-Pesa callback URL
    path('mpesa-callback/', mpesa_callback, name='mpesa-callback'),
    
    # Payment actions
    path('payments/<int:pk>/verify/', 
         PaymentViewSet.as_view({'post': 'verify'}), 
         name='payment-verify'),
    path('payments/<int:pk>/refund/', 
         PaymentViewSet.as_view({'post': 'refund'}), 
         name='payment-refund'),
    path('payments/<int:pk>/retry/', 
         PaymentViewSet.as_view({'post': 'retry'}), 
         name='payment-retry'),
]