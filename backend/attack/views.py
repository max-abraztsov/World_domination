from django.shortcuts import render
from loginPage.models import country
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from round.models import attacked_cities
from loginPage.models import city
import requests


@csrf_exempt
def attack(request):
    if request.method == 'POST':
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)  
        country_name = request_data.get('country')
        login_code = request_data.get('logincode')
        password = request_data.get('password')
        cities = request_data.get('attacked_cities')
        request_data_show = {
            'logincode': login_code,
            'password': password
        }

        try:
            Country = country.objects.get(CountryName=country_name)
            for attack_city in cities:
                city_under_attack = city.objects.get(city_name=attack_city['city_name'])
                #print(str(city_under_attack.city_name + "\nState: " + str(city_under_attack.state) + "\nShield: " + str(city_under_attack.shield)))
                if city_under_attack.shield == False:
                    city_under_attack.state = False
                if city_under_attack.shield == True:
                    city_under_attack.shield = False

                city_under_attack.save()
                
                

            #attacked_cities.objects.all().delete()

            response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
            json_response_data = response_data.json()

            return JsonResponse(json_response_data)
               
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)