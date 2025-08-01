from django.shortcuts import redirect
from django.urls import path
from .views import (
    UserRegistrationView,
    UserLoginView,
    UserLogoutView,
    UserProfileView,
    CustomerProfileView,
    VendorProfileView,
    PasswordChangeView,
    PasswordResetRequestView,
    PasswordResetConfirmView
)

urlpatterns = [
    path('', lambda request: redirect('/api/docs/')),

    # Authentication
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    
    # Profile Management
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/customer/', CustomerProfileView.as_view(), name='customer-profile'),
    path('profile/vendor/', VendorProfileView.as_view(), name='vendor-profile'),
    
    # Password Management
    path('password/change/', PasswordChangeView.as_view(), name='password-change'),
    path('password/reset/request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]