from django.db import models

# Create your models here.
from orders.models import Order
from users.models import User

class Payment(models.Model):
    MPESA = 'MP'
    CARD = 'CD'
    CASH_ON_DELIVERY = 'CO'
    
    PAYMENT_METHODS = [
        (MPESA, 'M-Pesa'),
        (CARD, 'Credit/Debit Card'),
        (CASH_ON_DELIVERY, 'Cash on Delivery'),
    ]
    PENDING = 'P'
    COMPLETED = 'C'
    FAILED = 'F'
    REFUNDED = 'R'
    
    PAYMENT_STATUS = [
        (PENDING, 'Pending'),
        (COMPLETED, 'Completed'),
        (FAILED, 'Failed'),
        (REFUNDED, 'Refunded'),
    ]
    
    status = models.CharField(
        max_length=1,
        choices=PAYMENT_STATUS,
        default=PENDING
    )
    failure_reason = models.TextField(blank=True, null=True)

    order = models.OneToOneField(Order, on_delete=models.PROTECT, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=2, choices=PAYMENT_METHODS)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)  # For MPesa
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    receipt_number = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment for Order #{self.order.id} - {self.get_payment_method_display()}"