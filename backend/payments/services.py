import os
import requests
import json
from django.conf import settings
from django.utils import timezone
from .models import Payment

class MpesaGateway:
    def __init__(self):
        self.consumer_key = os.getenv('MPESA_CONSUMER_KEY')
        self.consumer_secret = os.getenv('MPESA_CONSUMER_SECRET')
        self.business_shortcode = os.getenv('MPESA_BUSINESS_SHORTCODE')
        self.passkey = os.getenv('MPESA_PASSKEY')
        self.callback_url = os.getenv('MPESA_CALLBACK_URL')
        self.auth_token = None
        
    def authenticate(self):
        auth_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        response = requests.get(
            auth_url,
            auth=(self.consumer_key, self.consumer_secret)
        )
        self.auth_token = response.json().get('access_token')
        return self.auth_token is not None
        
    def stk_push(self, payment):
        if not self.auth_token and not self.authenticate():
            return False
            
        timestamp = timezone.now().strftime("%Y%m%d%H%M%S")
        password = base64.b64encode(
            (self.business_shortcode + self.passkey + timestamp).encode()
        ).decode()
        
        payload = {
            "BusinessShortCode": self.business_shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": str(int(payment.amount)),
            "PartyA": payment.phone_number,
            "PartyB": self.business_shortcode,
            "PhoneNumber": payment.phone_number,
            "CallBackURL": self.callback_url,
            "AccountReference": f"ORDER_{payment.order.id}",
            "TransactionDesc": f"Payment for order #{payment.order.id}"
        }
        
        headers = {
            "Authorization": f"Bearer {self.auth_token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            headers=headers,
            data=json.dumps(payload)
        )
        
        if response.status_code == 200:
            data = response.json()
            payment.transaction_id = data.get('MerchantRequestID')
            payment.save()
            return True
        return False

class CardPaymentGateway:
    @staticmethod
    def process_payment(payment, token):
        # In production, integrate with Stripe/Flutterwave/PayPal
        # This is a mock implementation
        payment.transaction_id = f"CARD_{payment.id}_{payment.order.id}"
        payment.receipt_number = f"RCPT{payment.id:06d}"
        payment.status = Payment.COMPLETED
        payment.save()
        return True