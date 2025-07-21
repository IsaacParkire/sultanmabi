from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, CustomerProfile, VendorProfile

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'user_type']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            user_type=validated_data['user_type']
        )
        
        # Create profile based on user type
        if user.is_customer:
            CustomerProfile.objects.create(user=user)
        elif user.is_vendor:
            VendorProfile.objects.create(user=user)
        
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)
            
            if not user:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
            
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.')
            
            refresh = RefreshToken.for_user(user)
            
            return {
                'email': user.email,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        else:
            raise serializers.ValidationError('Must include "email" and "password".')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'phone_number', 'user_type']
        read_only_fields = ['email', 'user_type']

class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = CustomerProfile
        fields = '__all__'

class VendorProfileSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = VendorProfile
        fields = '__all__'
        read_only_fields = ['approved', 'rating']

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    uid = serializers.CharField(required=True)