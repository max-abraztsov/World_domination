from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from loginPage.models import country, user
from django.http import JsonResponse
import json
import requests

@csrf_exempt
def minister_data(request):
    if request.method == 'POST':
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)  
        country_name = request_data.get('logincode')
        flag_picture = request_data.get('password')

        try:
            Country = country.objects.get(CountryName=country_name, flag_photo=flag_picture)
            print("Find a country for minister of " + str(country_name))
            User = user.objects.get(country_id=Country.id, role="minister")
            request_general_data = {
                'logincode': str(User.entercode),
                'password': str(User.password)
            }
            response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_general_data)
            json_response_data = response_data.json()
            return JsonResponse(json_response_data)
               
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)



