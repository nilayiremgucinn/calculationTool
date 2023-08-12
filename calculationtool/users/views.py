from django.shortcuts import render
from django.contrib.auth import login, logout
from users.serializers import AdminLoginSerializer, InputPageSerializer, InputSerializer, AdminSerializer
from users.models import InputPage, Input
from users.validations import validate_email, validate_password
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication

# Create your views here.
class AdminLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = AdminLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)

class AdminLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class AdminView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = AdminSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class AdminUserAPIView(APIView):
    serialzer_class = AdminSerializer

    def get(self, request):
        pass

    def post(self, request):
        pass

    def put(self, request):
        pass

    def delete (self, request):
        pass


class InputPageAPIView(APIView):
    serialzer_class = InputPageSerializer

    def post(self, request):
        title = request.data.get('title', None)
        description = request.data.get('description', None)
        image = request.data.get('image', None)

        post_data = {
            "title": title, 
            "description": description,
            "image": image
        }

        serializer = self.serializer_class(data=post_data)
        if serializer.is_valid(raise_exception=True):
            input_page = serializer.save()
        if input_page:
            return Response({'message': 'New input page created'}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        page_id = request.query_params.get('page_id', None)

        if page_id:
            input_pages = InputPage.objects.filter(page_id=page_id)
        else:
            input_pages = InputPage.objects.all()

        if input_pages:
            page_serializer = self.serialzer_class(input_pages, many=True)
            return Response(page_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No pages were configured'}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request):
        page_id = request.query_params.get('page_id', None)
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
        
        return Response({'message': 'Update completed!'}, status=status.HTTP_200_OK)

    def delete (self, request):
        page_id = request.query_params.get('page_id', None)
        input_page = InputPage.objects.get(page_id=page_id)

        if not input_page:
            return Response({'message': 'No pages were configures!'}, status=status.HTTP_404_NOT_FOUND)
        
        input_page.delete()
        return Response({'message': 'Input page removed!'}, status=status.HTTP_200_OK)