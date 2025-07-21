from django.db import models
from django.conf import settings
from products.models import Product
import uuid

class Cart(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='carts',
        null=True,
        blank=True
    )
    session_key = models.CharField(max_length=40, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = [['user', 'is_active'], ['session_key', 'is_active']]

    def __str__(self):
        if self.user:
            return f"Cart of {self.user.email}"
        return f"Guest Cart ({self.session_key})"

    @property
    def owner_identifier(self):
        return self.user.id if self.user else self.session_key

    @property
    def total_price(self):
        return sum(item.total_price for item in self.items.all())

    @property
    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    def merge_with(self, other_cart):
        """Merge another cart into this one"""
        for item in other_cart.items.all():
            existing_item = self.items.filter(product=item.product).first()
            if existing_item:
                existing_item.quantity += item.quantity
                existing_item.save()
            else:
                item.cart = self
                item.save()
        other_cart.is_active = False
        other_cart.save()