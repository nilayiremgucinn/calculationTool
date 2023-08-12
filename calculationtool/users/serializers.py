from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from users.models import Input, InputPage

UserModel = get_user_model()

class AdminLoginSerializer (serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user

class AdminSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')
	

class InputPageSerializer (serializers.ModelSerializer):
    class Meta:
        model = InputPage
        fields = '__all__'

class InputSerializer (serializers.ModelSerializer):
    class Meta:
        model = Input
        fields = '__all__'