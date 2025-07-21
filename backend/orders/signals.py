from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Order, OrderItem

@receiver(post_save, sender=Order)
def update_stock_on_order_status(sender, instance, **kwargs):
    if instance.status == Order.CANCELLED:
        # Restore stock for cancelled orders
        for item in instance.items.all():
            item.product.stock += item.quantity
            item.product.save()

@receiver(pre_save, sender=Order)
def check_stock_before_processing(sender, instance, **kwargs):
    if instance.status == Order.PROCESSING and instance.pk:
        original = Order.objects.get(pk=instance.pk)
        if original.status != Order.PROCESSING:
            for item in instance.items.all():
                if item.product.stock < item.quantity:
                    raise ValueError(f"Not enough stock for {item.product.name}")
            
            # Deduct stock
            for item in instance.items.all():
                item.product.stock -= item.quantity
                item.product.save()