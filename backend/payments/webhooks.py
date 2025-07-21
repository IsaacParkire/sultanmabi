from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Payment
import json

@csrf_exempt
def mpesa_callback(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        result_code = data.get('Body', {}).get('stkCallback', {}).get('ResultCode')
        merchant_request_id = data.get('Body', {}).get('stkCallback', {}).get('MerchantRequestID')
        
        try:
            payment = Payment.objects.get(transaction_id=merchant_request_id)
            if result_code == 0:
                payment.status = Payment.COMPLETED
                payment.receipt_number = data.get('Body', {}).get('stkCallback', {}).get('CallbackMetadata', {}).get('Item', [{}])[0].get('Value')
                payment.order.payment_completed = True
                payment.order.save()
            else:
                payment.status = Payment.FAILED
                payment.failure_reason = data.get('Body', {}).get('stkCallback', {}).get('ResultDesc')
            
            payment.save()
            return JsonResponse({'status': 'success'})
        except Payment.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Payment not found'}, status=404)
    
    return JsonResponse({'status': 'error'}, status=400)