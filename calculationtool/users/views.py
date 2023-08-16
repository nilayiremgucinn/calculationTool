from django.shortcuts import render
from django.contrib.auth import login, logout
from users.serializers import AdminLoginSerializer, InputPageSerializer, InputSerializer, AdminSerializer, OutputPageSerializer, OutputSerializer
from users.models import InputPage, Input, Output, OutputPage
from users.validations import validate_email, validate_password
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from calculationtool.settings import ADMIN_EMAIL, ADMIN_PASSWORD

# Create your views here.
class AdminLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        adminuser = User.objects.filter(
            username=ADMIN_EMAIL, 
            email=ADMIN_EMAIL).exists()
        if not adminuser:
            adminuser = User.objects.create_user(ADMIN_EMAIL, ADMIN_EMAIL, ADMIN_PASSWORD)
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = AdminLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = serializer.check_user(data)
                login(request, user)
            except BaseException as error:
                return Response({'message': error}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'message':"whats wrong with u"}, status=status.HTTP_200_OK)
        

class AdminLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class AdminView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (TokenAuthentication,)
	##
	def get(self, request):
		serializer = AdminSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class InputPageAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = InputPageSerializer
    input_serializer_class = InputSerializer

    def post(self, request):
        title = request.data.get('title', None)
        description = request.data.get('description', None)
        image = request.data.get('image', None)

        post_data = {
            "title": title, 
            "description": description,
            "image": image
        }
        print('cok yoruldum')
        inputs_data = request.data.get('inputs', None)
        serializer = self.serializer_class(data=post_data)
        print(serializer.is_valid())
        print(serializer.errors)
        if serializer.is_valid(raise_exception=True):
            input_page = serializer.create(clean_data=post_data)
            print('whats goin ong')
        
        for input_data in inputs_data:
            input_data.pop('input_id')
            print(input_data)
            input_data['input_page_id'] = input_page
            input_serializer = self.input_serializer_class(data=input_data)
            if input_serializer.is_valid(raise_exception=True):
                print('look around')
                inputs = input_serializer.create(clean_data=input_data)
            
        if input_page:
            return Response({'message': 'New input page created'}, status=status.HTTP_200_OK)
        return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        page_id = request.query_params.get('page_id', None)

        if page_id:
            input_pages = InputPage.objects.filter(page_id=page_id)
        else:
            input_pages = InputPage.objects.all()

        if input_pages:
            page_serializer = self.serializer_class(input_pages, many=True)
            pages = page_serializer.data[:]
            for page in pages:
               inputs = Input.objects.filter(input_page_id=page['page_id'])
               input_serializer = self.input_serializer_class(inputs, many=True)
               page['inputs'] = input_serializer.data
               print(page["inputs"])
            return Response(page_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No pages were configured'}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request):
        page_id = request.data.get('page_id', None)
        input_page = InputPage.objects.get(page_id=page_id)

        if not input_page:
            return Response({'message': 'No pages were configured!'}, status=status.HTTP_204_NO_CONTENT)
        
        title = request.data.get('title', None)
        if title:
            input_page.title = title
            input_page.save()

        description = request.data.get('description', None)
        if description:
            input_page.description = description
            input_page.save()

        image = request.data.get('image', None)
        if image:
            input_page.image = image
            input_page.save()

        inputs = request.data.get('inputs', None)
        if inputs:
            for input in inputs:
                input_id = input['input_id']
                inputObj = Input.objects.get(input_id=input_id)

                if not input:
                    return Response({'message': 'No pages were configured!'}, status=status.HTTP_204_NO_CONTENT)
                
                inputObj.name = input['name']
                inputObj.placeholder= input['placeholder']
                inputObj.coefficient = input['coefficient']
                inputObj.constant = input['constant']
                inputObj.save()
  
        return Response({'message': 'Update completed!'}, status=status.HTTP_200_OK)

    def delete (self, request):
        page_id = request.query_params.get('page_id', None)
        input_page = InputPage.objects.get(page_id=page_id)

        if not input_page:
            return Response({'message': 'No pages were configures!'}, status=status.HTTP_404_NOT_FOUND)
        
        input_page.delete()
        return Response({'message': 'Input page removed!'}, status=status.HTTP_200_OK)
    

class OutputPageAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = OutputPageSerializer
    output_serializer_class = OutputSerializer

    def post(self, request):
        title = request.data.get('title', None)
        image = request.data.get('image', None)

        post_data = {
            "title": title, 
            "image": image
        }
        outputs_data = request.data.get('outputs', None)
        serializer = self.serializer_class(data=post_data)
        if serializer.is_valid(raise_exception=True):
            output_page = serializer.create(clean_data=post_data)
        for output_data in outputs_data:
            output_serializer = self.output_serializer_class(data=output_data)
            if output_serializer.is_valid(raise_exception=True):
                outputs = output_serializer.create(clean_data=output_data)
            
        if output_page:
            return Response({'message': 'Output page created'}, status=status.HTTP_200_OK)
        return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        page_id = request.query_params.get('page_id', None)

        if page_id:
            output_pages = OutputPage.objects.filter(page_id=page_id)
        else:
            output_pages = OutputPage.objects.all()

        if output_pages:
            page_serializer = self.serializer_class(output_pages, many=True)
            pages = page_serializer.data[:]
            for page in pages:
               outputs = Output.objects.all()
               output_serializer = self.output_serializer_class(outputs, many=True)
               page['outputs'] = output_serializer.data
               print(page["outputs"])
            return Response(page_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No pages were configured'}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request):
        page_id = request.data.get('page_id', None)
        output_page = OutputPage.objects.get(page_id=page_id)

        if not output_page:
            return Response({'message': 'No pages were configured!'}, status=status.HTTP_204_NO_CONTENT)
        
        title = request.data.get('title', None)
        if title:
            output_page.title = title
            output_page.save()

        description = request.data.get('description', None)
        if description:
            output_page.description = description
            output_page.save()

        image = request.data.get('image', None)
        if image:
            output_page.image = image
            output_page.save()

        outputs = request.data.get('outputs', None)
        if outputs:
            for output in outputs:
                output_id = output['output_id']
                outputObj = Output.objects.get(output_id=output_id)

                if not output:
                    return Response({'message': 'No pages were configured!'}, status=status.HTTP_204_NO_CONTENT)
                
                outputObj.name = output['name']
                outputObj.constant = output['constant']
                outputObj.save()
  
        return Response({'message': 'Update completed!'}, status=status.HTTP_200_OK)

    def delete (self, request):
        page_id = request.query_params.get('page_id', None)
        output_page = OutputPage.objects.get(page_id=page_id)

        if not output_page:
            return Response({'message': 'No pages were configures!'}, status=status.HTTP_404_NOT_FOUND)
        
        output_page.delete()
        return Response({'message': 'Output page removed!'}, status=status.HTTP_200_OK)