from django.shortcuts import render
from rest_framework.views import APIView
from .models import Country
from .serializer import LoginSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_page(request):
    if request.method == 'POST':
        
        login_body = request.body.decode('utf-8')
        login_data = json.loads(login_body)
        logincode = login_data.get('logincode')

        pass_body = request.body.decode('utf-8')
        pass_data = json.loads(pass_body)
        password = pass_data.get('password')
                
        print(request.POST)

        try:
            country = Country.objects.get(EnterCode=logincode, Password=password)
            response_data = {
                'CountryName': country.CountryName,
                'NuclearTechnology': country.NuclearTechnology,
                'NuclearRockets': country.NuclearRockets,
                'Budget': country.Budget,
                'Round': country.Round,
                'Earnings': country.Earnings
            }
            return JsonResponse(response_data)
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


    


# class LoginView(APIView):
#     def post(self, request):
#         logincode = request.data.get('logincode')
#         password = request.data.get('password')

#         try:
#             country = countryinfo.objects.get(logincode=logincode, password=password)
#             response_data = {
#                 'CountryName': country.CountryName,
#                 'NuclearTechnology': country.NuclearTechnology,
#                 'NuclearRockets': country.NuclearRockets,
#                 'Budget': country.Budget,
#                 'Round': country.Round,
#                 'Earnings': country.Earnings
#             }
#             return JsonResponse(response_data)
#         except countryinfo.DoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)


# class LoginView(APIView): 
#     def get(self, request): 
#         output = [ 
#             { 
#                 "logincode": output.logincode,  
#                 "password": output.password 
#             } for output in Login.objects.all() 
#         ] 
#         return Response(output) 
 
#     def post(self, request): 
#         serializer = LoginSerializer(data=request.data) 
#         if serializer.is_valid(raise_exception=True): 
#             serializer.save() 
#             return Response(serializer.data)

