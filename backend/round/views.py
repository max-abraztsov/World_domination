from django.shortcuts import render
from django.db.models import Q
from backend import settings
from loginPage.models import country, city, ecology, sanction, user
from .models import attacked_cities, session
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from donate.views import donate
import json
import jwt
import requests
import time

'''
def generate_jwt_token(payload):
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token
'''


def forms_check(request_data_show):
    print("Start forms_check")
    Session = session.objects.get(id=1)
    while Session.forms_count <= Session.forms_max:
        Session = session.objects.get(id=1)
        if Session.forms_count == Session.forms_max:
            print("Find a last form")
            response_data = requests.post('http://127.0.0.1:8000/attack', json=request_data_show)
            Session.forms_count -= 1
            print("Down Session.forms_count -1")
            Session.save()
            print("Save changes in session.forms_count")
            json_response_data = response_data.json()
            return json_response_data
        else:
            time.sleep(30)
    
    



def calculations(request_data):
    print("Start calculations")
    print(request_data)
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
    Session = session.objects.get(id=1)
    Session.forms_count += 1
    Session.save()
    print("Session.forms_count is up +1")

    #add to database(attacked_cities) all cities under attack =================================================
    attacked_cities_list = []
    for enemy in enemies:
        for enemy_city in enemy['cities']:
            if enemy_city['is_attacked'] == True:
                Ecology.level -= 2
                attacked_city = {
                    'city_name': enemy_city['city_name']
                }
                attacked_cities_list.append(attacked_city)

    request_data_show = {
        'country': country_name,
        'logincode': User.entercode,
        'password': User.password,
        'attacked_cities': attacked_cities_list
    }

    cost = 0

    
    #send request to the app "donate" ========================================================================
    
    if donate_data['from'] != '' and donate_data['to'] != '':
        donate_response = requests.post('http://127.0.0.1:8000/donate', json=donate_data)
        response_data = donate_response.json()
        cost = response_data.get('budget')
    
    

    # add sanctions from this country =========================================================================
    
    for enemy in enemies:
        if enemy['sanctions'] == True:
            country_under_sanction = country.objects.filter(CountryName=enemy['country']).values('id')
            new_sanction = sanction(sanctionFrom_id = Country.id, sanctionFor_id = country_under_sanction[0]['id'])
            new_sanction.save()
            print("Add sanctions")
    
                
            
            
    #
    
    sum_profit = 0
    for one_request_city in cities:
        City = city.objects.get(country_id=Country.id, state=True, city_name=one_request_city['city_name'])
        if one_request_city['shield'] == True and City.shield == False:
            cost += 300
            if cost > Country.Budget:
                response_data = forms_check(request_data_show)
                return response_data
            City.shield = True
            print("add shield for city " + str(City.city_name))
        if one_request_city['develop'] == True:
            cost += 150
            if cost > Country.Budget:
                response_data = forms_check(request_data_show)
                return response_data
            City.progress += 8
            print("Upgrade progress to " + str(City.city_name))
            City.live_level = (Ecology.level * City.progress)/100
            print("Upgrade live level to " + str(City.city_name))
            City.profit = City.live_level*3
            print("Upgrade profit to " + str(City.city_name))
        sum_profit += City.profit
        City.save()
        print("Save shield, progress, live level and profit to " + str(City.city_name))
    

    #up round ===========================================================================================
    
    if Country.Round<7:
        Country.Round += 1
        print("Upgrade round +1")
    else:
        Country.Round = 6
    
            
    #update ecology level ===================================================================================
    new_ecology = ecology.objects.get(round=Country.Round)
    if ecology_dev == True:
        cost += 200
        if cost > Country.Budget:
            response_data = forms_check(request_data_show)
            return response_data
        new_ecology.level = Ecology.level + 5
        print("Upgrade ecology level")
        if new_ecology.level > 100:
            new_ecology.level = 100
    
            

    #set nuclear technology and order new rockets ==================================================
    
    if(nuclear_technology == True):
        if nuclear_technology == True and Country.NuclearTechnology == False:
            cost += 500
            if cost > Country.Budget:
                response_data = forms_check(request_data_show)
                return response_data
            new_ecology.level -= 3
            Country.NuclearTechnology = nuclear_technology
            print("Set nuclear technology on True")
        Country.NuclearRockets += nuclear_rockets
        print("Upgrade order rockets on " + strt(nuclear_rockets))
        cost += nuclear_rockets * 150
        if cost > Country.Budget:
            response_data = forms_check(request_data_show)
            return response_data
                
    elif(nuclear_technology==False):
        Country.NuclearRockets = 0
    


    #sanctions count =================================================================================
    print("Message before sanctions")
    Sanction = sanction.objects.filter(sanctionFor_id=Country.id)
    print("Message after sanctions")
    Sanctions_array = list(Sanction)
    
            
    #Budget ==========================================================================================
    Country.Budget += Country.Earnings - 20 * len(Sanctions_array) - cost
    print("Calculate new country budget")
    Country.Earnings = sum_profit
    print("Set new country earnings")
                
    Country.save()
    print("General save country data")
    Ecology.save()
    new_ecology.save()
    print("Save ecology changes")
    
    
    
    response_data = forms_check(request_data_show)
    return response_data


@csrf_exempt
def end_round(request):
    if request.method == 'POST':
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)  
        country_name = request_data.get('country')

        try:
            Country = country.objects.get(CountryName=country_name)
            print("Find a country")
            response_data = calculations(request_data)
            return JsonResponse(response_data)
               
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


