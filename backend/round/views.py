from django.shortcuts import render
from django.db.models import Q
from backend import settings
from loginPage.models import country
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from donate.views import donate
import json
import jwt
import requests

def generate_jwt_token(payload):
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

@csrf_exempt
def end_round(request):
    if request.method == 'POST':
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)
        country_name = request_data.get('country')
        nuclear_technology = request_data.get('nuclear_technology')
        nuclear_rockets = request_data.get('rocket_order')
        donate_data = request_data.get('donate')
        
        try:
            Country = country.objects.get(CountryName=country_name)

            
            donate_response = requests.post('http://127.0.0.1:8000/donate', json=donate_data)


            if(nuclear_technology==True):
                Country.NuclearTechnology = nuclear_technology
                Country.NuclearRockets += nuclear_rockets
                Country.save()
            elif(nuclear_technology==False):
                Country.NuclearRockets = 0
                Country.save()

            
            response_data = {
                'Country': donate_data
            }

            token = generate_jwt_token(response_data)

            #return JsonResponse({'token': token})
            return JsonResponse(response_data)
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
