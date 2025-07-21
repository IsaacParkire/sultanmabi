from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, CustomerProfile, VendorProfile

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'user_type', 'is_staff')
    list_filter = ('user_type', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone_number')}),
        ('Permissions', {'fields': ('user_type', 'is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'user_type'),
        }),
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = ()

class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'loyalty_points')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')

class VendorProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'company_name', 'approved', 'rating')
    list_filter = ('approved',)
    search_fields = ('user__email', 'company_name')
    list_editable = ('approved',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(CustomerProfile, CustomerProfileAdmin)
admin.site.register(VendorProfile, VendorProfileAdmin)