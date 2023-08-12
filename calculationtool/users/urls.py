from django.urls import path
from users.views import InputPageAPIView, AdminUserAPIView, AdminLogin, AdminView, AdminLogout

urlpatterns = [
    path('admin/', AdminView.as_view()),
    path('login/', AdminLogin.as_view(), name='login'),
    path('logout/', AdminLogout.as_view(), name='logout'),
	path('configure/', InputPageAPIView.as_view(), name='inputpage'),
    #path('input/', InputAPIView.as_view(), name=input),
    #path('image/', ImageAPIView.as_view(), name=image),
    #path('calculate/', OutputPageAPIView.as_view(), name=output),
]