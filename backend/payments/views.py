from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from .models import Payment
from .serializers import PaymentSerializer
from users.permissions import IsOwnerOrAdmin
from .services import MpesaGateway, CardPaymentGateway
import logging

logger = logging.getLogger(__name__)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Payment.objects.all()
        return Payment.objects.filter(order__customer=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        payment = serializer.instance
        self.process_payment(payment)
        
        # Return the updated payment status
        serializer = self.get_serializer(payment)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def process_payment(self, payment):
        try:
            if payment.payment_method == Payment.MPESA:
                mpesa = MpesaGateway()
                if mpesa.stk_push(payment):
                    payment.status = Payment.PENDING
                else:
                    payment.status = Payment.FAILED
                    payment.failure_reason = "Failed to initiate M-Pesa payment"
            
            elif payment.payment_method == Payment.CARD:
                token = self.request.data.get('token')
                if token and CardPaymentGateway.process_payment(payment, token):
                    payment.status = Payment.COMPLETED
                    payment.order.payment_completed = True
                    payment.order.save()
                else:
                    payment.status = Payment.FAILED
                    payment.failure_reason = "Card payment failed"
            
            payment.save()
            
        except Exception as e:
            logger.error(f"Payment processing failed: {str(e)}")
            payment.status = Payment.FAILED
            payment.failure_reason = str(e)
            payment.save()

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        payment = self.get_object()
        
        # In production, verify with payment provider
        if payment.status == Payment.PENDING:
            # Simulate verification with payment provider
            if payment.payment_method == Payment.MPESA:
                payment.status = Payment.COMPLETED
                payment.order.payment_completed = True
                payment.order.save()
                payment.save()
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def refund(self, request, pk=None):
        payment = self.get_object()
        
        if payment.status != Payment.COMPLETED:
            return Response(
                {"error": "Only completed payments can be refunded"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Process refund - in production integrate with payment provider
        try:
            payment.status = Payment.REFUNDED
            payment.refunded_at = timezone.now()
            payment.save()
            
            # Update order status
            payment.order.status = Order.CANCELLED
            payment.order.save()
            
            serializer = self.get_serializer(payment)
            return Response(serializer.data)
            
        except Exception as e:
            logger.error(f"Refund failed: {str(e)}")
            return Response(
                {"error": "Refund processing failed"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def retry(self, request, pk=None):
        payment = self.get_object()
        
        if payment.status != Payment.FAILED:
            return Response(
                {"error": "Only failed payments can be retried"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Reset payment for retry
        payment.status = Payment.PENDING
        payment.failure_reason = None
        payment.save()
        
        # Process the payment again
        self.process_payment(payment)
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data)