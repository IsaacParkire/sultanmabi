from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

class User(AbstractUser):
    # Remove username field, we'll use email
    username = None
    email = models.EmailField(_('email address'), unique=True)
    
    # User types
    CUSTOMER = 'CU'
    VENDOR = 'VE'
    ADMIN = 'AD'
    USER_TYPE_CHOICES = [
        (CUSTOMER, 'Customer'),
        (VENDOR, 'Vendor'),
        (ADMIN, 'Admin'),
    ]
    
    user_type = models.CharField(
        max_length=2,
        choices=USER_TYPE_CHOICES,
        default=CUSTOMER
    )
    phone_number = models.CharField(max_length=20, blank=True)
    is_verified = models.BooleanField(default=False)
    
    # Set email as the USERNAME_FIELD
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email
    
    @property
    def is_customer(self):
        return self.user_type == self.CUSTOMER
    
    @property
    def is_vendor(self):
        return self.user_type == self.VENDOR
    
    @property
    def is_admin(self):
        return self.user_type == self.ADMIN

class CustomerProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='customer_profile'
    )
    date_of_birth = models.DateField(null=True, blank=True)
    preferred_shipping_address = models.TextField(blank=True)
    preferred_payment_method = models.CharField(max_length=50, blank=True)
    loyalty_points = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"Customer Profile for {self.user.email}"

class VendorProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='vendor_profile'
    )
    company_name = models.CharField(max_length=100)
    business_registration = models.CharField(max_length=50, blank=True)
    tax_id = models.CharField(max_length=50, blank=True)
    approved = models.BooleanField(default=False)
    bio = models.TextField(blank=True)
    rating = models.FloatField(default=0.0)
    
    def __str__(self):
        return f"Vendor Profile for {self.company_name}"