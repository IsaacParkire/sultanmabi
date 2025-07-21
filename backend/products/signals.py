from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Product

@receiver(pre_save, sender=Product)
def update_product_availability(sender, instance, **kwargs):
    """Update available status based on stock"""
    if instance.stock <= 0:
        instance.available = False
    else:
        instance.available = True