from django.urls import path
from users.views import InputPageAPIView, AdminUserAPIView, AdminLogin, AdminView, AdminLogout, OutputPageAPIView

urlpatterns = [
    path('admin', AdminView.as_view()),
    path('login', AdminLogin.as_view(), name='login'),
    path('logout', AdminLogout.as_view(), name='logout'),
	path('input', InputPageAPIView.as_view(), name='inputpage'),
    #path('image/', ImageAPIView.as_view(), name=image),
    path('output', OutputPageAPIView.as_view(), name='output'),
]