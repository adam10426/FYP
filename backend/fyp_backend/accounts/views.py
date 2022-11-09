from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from .models import *
from .serializers import * 

# Create your views here.

class RegisterUser(APIView):
    def post(self,request):
        try:
            user = request.data
            register_user = Users.objects.create_user(email=user['email'],username=user['username'],password=user['password'],first_name=user['first_name'],last_name=user['last_name'],address=user['address'],contact=user['contact'])
            register_user.save()
            return Response({"message":"user has been created"})
        except Exception as e:
            print(Exception)
            return Response({"message":"User not created"})

class Login(APIView):
    def post(self,request):
        user = request.data
        authenticated = authenticate(username=user['username'], password=user['password'])
        authenticatedUser = UserSerializer(authenticated)
        if authenticated:
            return Response({"user":authenticatedUser.data})
        else:
            return Response({"message":"User not found"})

