from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'amount', 'payment_method', 'completed', )
    list_filter = ('completed', 'payment_method')
    search_fields = ('order__id', 'transaction_id')