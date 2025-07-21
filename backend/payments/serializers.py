from rest_framework import serializers
from .models import Payment
from orders.serializers import OrderSerializer

class PaymentSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    order_id = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.filter(payment_completed=False),
        source='order',
        write_only=True
    )

    class Meta:
        model = Payment
        fields = [
            'id', 'order', 'order_id', 'amount', 'payment_method',
            'transaction_id', 'phone_number', 'created_at',
            'completed', 'receipt_number'
        ]
        read_only_fields = ['amount', 'completed', 'receipt_number']
        extra_kwargs = {
            'phone_number': {'required': False},
            'transaction_id': {'required': False}
        }

    def validate(self, data):
        if data['payment_method'] == 'MP' and not data.get('phone_number'):
            raise serializers.ValidationError(
                {"phone_number": "Phone number is required for M-Pesa payments"}
            )
        return data

    def create(self, validated_data):
        order = validated_data['order']
        validated_data['amount'] = order.total_price
        return super().create(validated_data)