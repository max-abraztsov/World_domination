from django.shortcuts import render 
from rest_framework.views import APIView 
from .models import Login 
from .serializer import LoginSerializer  
from rest_framework.response import Response  
 
 
class LoginView(APIView): 
    def get(self, request): 
        output = [ 
            { 
                "logincode": output.logincode,  
                "password": output.password 
            } for output in Login.objects.all() 
        ] 
        return Response(output) 
 
    def post(self, request): 
        serializer = LoginSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return Response(serializer.data)