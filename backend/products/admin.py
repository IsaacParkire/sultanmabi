from django.contrib import admin
from .models import Product, Category

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'available', 'meat_type', 'storage_type')
    list_filter = ('available', 'category', 'meat_type', 'storage_type')
    list_editable = ('price', 'stock', 'available')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    actions = ['make_available', 'make_unavailable']

    def make_available(self, request, queryset):
        queryset.update(available=True)
    make_available.short_description = "Mark selected products as available"

    def make_unavailable(self, request, queryset):
        queryset.update(available=False)
    make_unavailable.short_description = "Mark selected products as unavailable"

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)