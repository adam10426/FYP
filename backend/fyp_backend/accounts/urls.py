from django.urls import re_path,path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('register',RegisterUser.as_view()),
    path('login',Login.as_view())
]
