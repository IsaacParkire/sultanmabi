from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    # Registration endpoint
    path('register/', views.RegisterView.as_view(), name='register'),

    # JWT login endpoint
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # JWT refresh endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Example: Protected user profile endpoint
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
]
