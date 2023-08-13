from django.shortcuts import render
from loginPage.models import country
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from round.models import attacked_cities
from loginPage.models import city
import requests
import json

@csrf_exempt
def attack(request):
    if request.method == 'POST':
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)  
        country_name = request_data.get('country')
        login_code = request_data.get('logincode')
        password = request_data.get('password')
        cities_under_attacks = attacked_cities.objects.all()
        request_data_show = {
            'logincode': login_code,
            'password': password
        }

        try:
            Country = country.objects.get(CountryName=country_name)
            cities = []
            for attack_city in cities_under_attacks:
                city_under_attack = city.objects.get(city_name=attack_city)
                one_city = {
                    'city_name': city_under_attack.city_name
                }
                cities.append(one_city)
                
                if city_under_attack.shield == False:
                    city_under_attack.state = False
                    print(str(city_under_attack.city_name) + " is destroy!")
                if city_under_attack.shield == True:
                    city_under_attack.shield = False
                    print("Shiled of " + str(city_under_attack.city_name) + " is destroy!")

                city_under_attack.save()
                
            attacked_cities.objects.all().delete()
            print("All cities from attacked_cities was deleted")

            json_response_data = {
                'Attacked_Cities': cities
            }

            return JsonResponse(json_response_data)
               
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)