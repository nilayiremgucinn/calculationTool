from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from users.models import Input, InputPage, OutputPage, Output

UserModel = get_user_model()

class AdminLoginSerializer (serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'password')
    
    email = serializers.EmailField()
    password = serializers.CharField()
    def check_user(self, clean_data):
        print(clean_data['password'])
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('User not found')
        return user

class AdminSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')
	

class InputPageSerializer (serializers.ModelSerializer):
    class Meta:
        model = InputPage
        fields = '__all__'

    def create(self, clean_data):
        page_obj = InputPage.objects.create(title=clean_data['title'], description=clean_data['description'])
        page_obj.image = clean_data['image']
        page_obj.save()
        return page_obj

class InputSerializer (serializers.ModelSerializer):
    class Meta:
        model = Input
        fields = ('input_id', 'name', 'placeholder', 'coefficient')

    def create(self, clean_data):
        input_obj = Input.objects.create(name=clean_data['name'], 
                                         placeholder=clean_data['placeholder'], 
                                         coefficient=clean_data['coefficient'], 
                                         input_page_id=clean_data['input_page_id'])
        input_obj.save()
        return input_obj
    

class OutputPageSerializer (serializers.ModelSerializer):
    class Meta:
        model = OutputPage
        fields = '__all__'

    def create(self, clean_data):
        page_obj = OutputPage.objects.create(title=clean_data['title'], description=clean_data['description'])
        page_obj.image = clean_data['image']
        page_obj.save()
        return page_obj

class OutputSerializer (serializers.ModelSerializer):
    class Meta:
        model = Output
        fields = ('output_id', 'name', 'constant')

    def create(self, clean_data):
        output_obj = Output.objects.create(name=clean_data['name'],  
                                         constant=clean_data['constant'] )
        output_obj.save()
        return output_obj