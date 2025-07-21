from django.db import models
from django.core.validators import MinValueValidator
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/', blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Product(models.Model):
    BEEF = 'BF'
    CHICKEN = 'CH'
    LAMB = 'LM'
    FISH = 'FS'
    OTHER = 'OT'
    
    MEAT_TYPES = [
        (BEEF, 'Beef'),
        (CHICKEN, 'Chicken'),
        (LAMB, 'Lamb'),
        (FISH, 'Fish'),
        (OTHER, 'Other'),
    ]

    FRESH = 'FR'
    FROZEN = 'FZ'
    PROCESSED = 'PR'
    
    STORAGE_TYPES = [
        (FRESH, 'Fresh'),
        (FROZEN, 'Frozen'),
        (PROCESSED, 'Processed'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.PROTECT)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    stock = models.PositiveIntegerField(default=0)
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='products/', blank=True)
    meat_type = models.CharField(max_length=2, choices=MEAT_TYPES)
    storage_type = models.CharField(max_length=2, choices=STORAGE_TYPES)
    weight = models.DecimalField(max_digits=6, decimal_places=2, help_text="Weight in kilograms")
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['name']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('product-detail', kwargs={'slug': self.slug})