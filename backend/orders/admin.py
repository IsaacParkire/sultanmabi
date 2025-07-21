from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'created_at', 'status', 'total_price', 'payment_completed']
    list_filter = ['status', 'payment_completed', 'created_at']
    search_fields = ['customer__email', 'contact_phone', 'shipping_address']
    inlines = [OrderItemInline]
    actions = ['mark_as_processing', 'mark_as_shipped']

    def mark_as_processing(self, request, queryset):
        queryset.update(status=Order.PROCESSING)
    mark_as_processing.short_description = "Mark selected orders as Processing"

    def mark_as_shipped(self, request, queryset):
        queryset.update(status=Order.SHIPPED)
    mark_as_shipped.short_description = "Mark selected orders as Shipped"

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'quantity', 'price']
    list_select_related = ['order', 'product']