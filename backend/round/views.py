from django.shortcuts import render
from django.db.models import Q
from backend import settings
from loginPage.models import country
from loginPage.models import ecology
from loginPage.models import city
from loginPage.models import sanction
from .models import attacked_cities
from loginPage.models import user
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from donate.views import donate
import json
import jwt
import requests

def generate_jwt_token(payload):
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token


def calculations(request_data):
    country_name = request_data.get('country')
    nuclear_technology = request_data.get('nuclear_technology')
    nuclear_rockets = request_data.get('rocket_order')
    donate_data = request_data.get('donate')
    n_round = request_data.get('round')
    ecology_dev = request_data.get('ecology')
    cities = request_data.get('cities')
    enemies = request_data.get('enemies')
    
    Country = country.objects.get(CountryName=country_name)
    User = user.objects.get(country_id=Country.id)
    Ecology = ecology.objects.get(round=Country.Round)

    request_data_show = {
        'logincode': User.entercode,
        'password': User.password
    }

    cost = 0

    '''
    Cities = attacked_cities.objects.all()
    for attack_city in Cities:
        city_under_attack = city.objects.get(city_name=attack_city, state=True)
        print(str(city_under_attack.city_name + "\nState: " + str(city_under_attack.state) + "\nShield: " + str(city_under_attack.shield)))
        if city_under_attack.shield == False:
            city_under_attack.state = False
        if city_under_attack.shield == True:
            city_under_attack.shield = False

        city_under_attack.save()
    attacked_cities.objects.all().delete()
    '''


    #send request to the app "donate" ========================================================================
    '''
    if donate_data['from'] != '' and donate_data['to'] != '':
        donate_response = requests.post('http://127.0.0.1:8000/donate', json=donate_data)
        response_data = donate_response.json()
        cost = response_data.get('budget')
    '''
            
    #add to database(attacked_cities) all cities under attack =================================================
    '''
    for enemy in enemies:
        for enemy_city in enemy['cities']:
            if enemy_city['is_attacked'] == True:
                Ecology.level -= 2
                city_from_db = city.objects.filter(city_name=enemy_city['city_name']).values('id')
                attacked_city = attacked_cities(city_name_id=city_from_db[0]['id'])
                attacked_city.save()
    '''

    # add sanctions from this country =========================================================================
    '''
    for enemy in enemies:
        if enemy['sanctions'] == True:
            country_under_sanction = country.objects.filter(CountryName=enemy['country']).values('id')
            new_sanction = sanction(sanctionFrom_id = Country.id, sanctionFor_id = country_under_sanction[0]['id'])
            new_sanction.save()
    '''
                
            
            
    #
    '''
    sum_profit = 0
    for one_request_city in cities:
        City = city.objects.get(country_id=Country.id, state=True, city_name=one_request_city['city_name'])
        if one_request_city['shield'] == True and City.shield == False:
            cost += 300
            if cost > Country.Budget:
                response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
                json_response_data = response_data.json()
                return json_response_data
            City.shield = True
        if one_request_city['develop'] == True:
            cost += 150
            if cost > Country.Budget:
                response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
                json_response_data = response_data.json()
                return json_response_data
            City.progress += 8
            City.live_level = (Ecology.level * City.progress)/100
            City.profit = City.live_level*3
        sum_profit += City.profit
        City.save()
    '''

    #up round ===========================================================================================
    '''
    if Country.Round<7:
        Country.Round += 1
    else:
        Country.Round = 6
    '''
            
    #update ecology level ===================================================================================
    '''
    if ecology_dev == True:
        cost += 200
        if cost > Country.Budget:
            response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
            json_response_data = response_data.json()
            return json_response_data
        Ecology.level += 5
        Ecology.round = Country.Round
        if Ecology.level > 100:
            Ecology.level = 100
    '''
            

    #set nuclear technology and order new rockets ==================================================
    '''
    if(nuclear_technology == True):
        if nuclear_technology == True and Country.NuclearTechnology == False:
            cost += 500
            if cost > Country.Budget:
                response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
                json_response_data = response_data.json()
                return json_response_data
            Ecology.level -= 3
            Country.NuclearTechnology = nuclear_technology
        Country.NuclearRockets += nuclear_rockets
        cost += nuclear_rockets * 150
        if cost > Country.Budget:
            response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
            json_response_data = response_data.json()
            return json_response_data
                
    elif(nuclear_technology==False):
        Country.NuclearRockets = 0
    '''


    #sanctions count =================================================================================
    '''
    Sanction = sanction.objects.filter(sanctionFor_id=Country.id)
    Sanctions_array = list(Sanction)
    '''
            
    #Budget ==========================================================================================
    #Country.Budget += Country.Earnings - 20 * len(Sanctions_array) - cost
    #Country.Earnings = sum_profit
                
    Country.save()
    Ecology.save()

    response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
    json_response_data = response_data.json()
    return json_response_data


@csrf_exempt
def end_round(request):
    if request.method == 'POST':
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)  
        country_name = request_data.get('country')

        try:
            Country = country.objects.get(CountryName=country_name)
            return JsonResponse(calculations(request_data))
               
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

