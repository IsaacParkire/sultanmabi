from django.db import models

# Create your models here.
from django.core.validators import MinValueValidator
from users.models import User
from products.models import Product

class Order(models.Model):
    PENDING = 'P'
    PROCESSING = 'PR'
    SHIPPED = 'S'
    DELIVERED = 'D'
    CANCELLED = 'C'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (PROCESSING, 'Processing'),
        (SHIPPED, 'Shipped'),
        (DELIVERED, 'Delivered'),
        (CANCELLED, 'Cancelled'),
    ]

    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default=PENDING)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    shipping_address = models.TextField()
    contact_phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True, null=True)
    payment_completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.id} - {self.get_status_display()}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Order #{self.order.id})"

    def get_total_price(self):
        return self.quantity * self.price