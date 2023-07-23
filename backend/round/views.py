from django.shortcuts import render
from django.db.models import Q
from backend import settings
from loginPage.models import country
from loginPage.models import ecology
from loginPage.models import city
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
        n_round = request_data.get('round')
        ecology_dev = request_data.get('ecology')
        cities = request_data.get('cities')
        
        try:
            Country = country.objects.get(CountryName=country_name)
            Ecology = ecology.objects.get(round=Country.Round)
            #send request to the app "donate"
            # donate_response = requests.post('http://127.0.0.1:8000/donate', json=donate_data)
            # response_data = donate_response.json()
            # Country.Budget = response_data.get('budget')
            
            #up round 
            # if Country.Round<7:
            #     Country.Round += 1
            # else:
            #     Country.Round = 6
            
            sum_profit = 0
            for one_request_city in cities:
                City = city.objects.get(country_id=Country.id, state=True, city_name=one_request_city['city_name'])
                if one_request_city['shield'] == True and City.shield == False:
                    Country.Budget -= 300
                    City.shield = True
                if one_request_city['develop'] == True:
                    Country.Budget -= 150
                    City.progress += 8
                    City.live_level = (Ecology.level * City.progress)/100
                    City.profit = City.live_level*3
                sum_profit += City.profit
                City.save()


            Country.Earnings = sum_profit
            
            #update ecology level
            # if ecology_dev == True:
            #     Ecology.level += 5
            #     Ecology.round = Country.Round
            #     if Ecology.level > 100:
            #         Ecology.level = 100

            #==============================================================================

            # if(nuclear_technology==True):
            #     Country.NuclearTechnology = nuclear_technology
            #     Country.NuclearRockets += nuclear_rockets
                
            # elif(nuclear_technology==False):
            #     Country.NuclearRockets = 0
                
            Country.save()
            Ecology.save()

            
            response_data = {
                'Round': n_round,
                "Ecology": Ecology.id
            }

            token = generate_jwt_token(response_data)

            #return JsonResponse({'token': token})
            return JsonResponse(response_data)
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
