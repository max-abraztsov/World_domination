from django.shortcuts import render
from django.db.models import Q
from backend import settings
from loginPage.models import country, city, ecology, sanction, user
from .models import attacked_cities, session
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from timeout_decorator import timeout
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
    country_name = request_data_show.get('country')
    new_round = request_data_show.get('new_round')
    set_new_ecology = ecology.objects.get(round=new_round)
    print(str(country_name) + ": start forms_check")
    Session = session.objects.get(id=1)
    while Session.forms_count <= Session.forms_max:
        Session = session.objects.get(id=1)
        if Session.sended == True:
            if Session.forms_count == 1:
                Session.sended = False
                print("Set Session.sended = False")
                formsmax_response = requests.post('http://127.0.0.1:8000/formsmax', json=request_data_show)
                response_data = formsmax_response.json()
                forms_max = response_data.get('alive_countries')
                Session.forms_max = forms_max
                print("Update max forms (" + str(Session.forms_max) + ")")
            Session.forms_count -= 1
            Session.save()
            print(str(country_name) + ": session.forms_count -1 (Count of forms = " + str(Session.forms_count) + ")")
            break
        else:
            if Session.forms_count == Session.forms_max:
                Session.sended = True
                set_new_ecology.level = Session.eco_actual
                print("Find a last form: " + str(country_name) + " (all forms were sended)")
                response_data = requests.post('http://127.0.0.1:8000/attack', json=request_data_show)
                print(str(country_name) + ": attack is successfull")
                Session.save()
                set_new_ecology.save()
            else:
                time.sleep(15)    



def calculations(request_data):
    country_name = request_data.get('country')
    print(str(country_name) + ": start calculations")
    nuclear_technology = request_data.get('nuclear_technology')
    nuclear_rockets = request_data.get('rocket_order')
    donate_data = request_data.get('donate')
    n_round = request_data.get('round')
    ecology_dev = request_data.get('ecology')
    cities = request_data.get('cities')
    enemies = request_data.get('enemies')

    Country = country.objects.get(CountryName=country_name)
    User = user.objects.get(country_id=Country.id, role="president")
    Ecology = ecology.objects.get(round=Country.Round)
    
    Session = session.objects.get(id=1)
    Session.forms_count += 1
    Session.save()
    print(str(country_name) + ": session.forms_count is up +1")

    #add to database(attacked_cities) all cities under attack =================================================
    Actual_ecology = session.objects.get(id=1)
    for enemy in enemies:
        for enemy_city in enemy['cities']:
            if enemy_city['is_attacked'] == True and enemy_city['state'] == True:
                Country.NuclearRockets -= 1
                Actual_ecology.eco_actual -= 2
                Actual_ecology.save()
                attack_city = city.objects.filter(city_name=enemy_city['city_name']).values('id')
                add_db_city = attacked_cities(city_name_id=attack_city[0]['id'])
                add_db_city.save()
                print(str(enemy_city['city_name']) + " was added in attacked_cities")
                

    request_data_show = {
        'country': country_name,
        'logincode': User.entercode,
        'password': User.password,
        'new_round': Country.Round + 1
    }

    cost = 0

    #send request to the app "donate" ========================================================================
    if donate_data['from'] != '' and donate_data['to'] != '':
        donate_response = requests.post('http://127.0.0.1:8000/donate', json=donate_data)
        response_data = donate_response.json()
        Country.Budget = response_data.get('budget')
    
    
    # add sanctions from this country =========================================================================
    for enemy in enemies:
        print("true")
        if enemy['sanctions'] == True:
            country_under_sanction = country.objects.filter(CountryName=enemy['country']).values('id')
            if_sanction_exist = sanction.objects.filter(Q(sanctionFrom_id=Country.id) & Q(sanctionFor_id=country_under_sanction[0]['id'])).exists()
            if if_sanction_exist == False:
                new_sanction = sanction(sanctionFrom_id = Country.id, sanctionFor_id = country_under_sanction[0]['id'])
                new_sanction.save()
                print(str(country_name) + ": add sanctions on " + str(enemy['country']))
        print("false")
        if enemy['sanctions'] == False:
            country_without_sanction = country.objects.filter(CountryName=enemy['country']).values('id')
            if_sanction_exist = sanction.objects.filter(Q(sanctionFrom_id=Country.id) & Q(sanctionFor_id=country_without_sanction[0]['id'])).exists()
            if if_sanction_exist == True:
                sanction.objects.filter(Q(sanctionFrom_id=Country.id) & Q(sanctionFor_id=country_without_sanction[0]['id'])).delete()
                print(str(country_name) + ": sanctions from " + str(enemy['country']) + " was removed")


    #update info about all cities in country (shields and progress)
    for one_request_city in cities:
        City = city.objects.get(country_id=Country.id, city_name=one_request_city['city_name'])
        if (one_request_city['shield'] == True and City.shield == False) and City.state == True:
            cost += 300
            if cost > Country.Budget:
                response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
                json_response_data = response_data.json()
                return json_response_data
            City.shield = True
            print(str(country_name) + ": add shield for city " + str(City.city_name))
        if one_request_city['develop'] == True and City.state == True:
            cost += 150
            if cost > Country.Budget:
                response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
                json_response_data = response_data.json()
                return json_response_data
            City.progress += 8
            print(str(country_name) + ": upgrade progress to " + str(City.city_name))
        City.save()

    
    sum_profit = 0
    for one_city_live_level in cities:
        City = city.objects.get(country_id=Country.id, city_name=one_city_live_level['city_name'])
        City.live_level = (Ecology.level * City.progress)/100
        print(str(country_name) + ": upgrade live level to " + str(City.city_name))
        City.profit = City.live_level * 2.3
        print(str(country_name) + " upgrade profit to " + str(City.city_name))
        sum_profit += City.profit
        City.save()
    

    #up round ===========================================================================================
    if Country.Round<8:
        Country.Round += 1
        print(str(country_name) + ": upgrade round +1")
    else:
        Country.Round = 7
    
            
    #update ecology level ===================================================================================
    Actual_ecology = session.objects.get(id=1)
    if ecology_dev == True:
        cost += 200
        if cost > Country.Budget:
            response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
            json_response_data = response_data.json()
            return json_response_data
        Actual_ecology.eco_actual += 5
        print(str(country_name) + ": upgrade ecology level")
        if Actual_ecology.eco_actual > 100:
            Actual_ecology.eco_actual = 100
        Actual_ecology.save()
    
            

    #set nuclear technology and order new rockets ==================================================
    Actual_ecology = session.objects.get(id=1)
    if nuclear_technology == True:
        if Country.NuclearTechnology == False:
            cost += 500
            if cost > Country.Budget:
                response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
                json_response_data = response_data.json()
                return json_response_data
            Actual_ecology.eco_actual -= 3
            Actual_ecology.save()
            Country.NuclearTechnology = nuclear_technology
            print(str(country_name) + ": set nuclear technology on True")
        Country.NuclearRockets += nuclear_rockets
        Actual_ecology = session.objects.get(id=1)
        Actual_ecology.eco_actual -= 2 * nuclear_rockets
        Actual_ecology.save()
        print(str(country_name) + ": upgrade order rockets on " + str(nuclear_rockets))
        cost += nuclear_rockets * 150
        if cost > Country.Budget:
            response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
            json_response_data = response_data.json()
            return json_response_data
                
    elif(nuclear_technology==False):
        Country.NuclearRockets = 0


    #attack cities of enemies ===========================================================================
    forms_check(request_data_show)
    

    #sanctions count =================================================================================
    Sanction = sanction.objects.filter(sanctionFor_id=Country.id)
    Sanctions_array = list(Sanction)
    

    #Budget ==========================================================================================
    Country.Budget += Country.Earnings - 50 * len(Sanctions_array) - cost
    print(str(country_name) + ": calculate new country budget")
    Country.Earnings = sum_profit
    print(str(country_name) + ": set new country earnings")
                
    Country.save()
    print(str(country_name) + ": general save country data")
    print(str(country_name) + ": save ecology changes")
    
    response_data = requests.post('http://127.0.0.1:8000/login_page', json=request_data_show)
    json_response_data = response_data.json()
    return json_response_data


@csrf_exempt
def end_round(request):
    print("\n\n\n")
    if request.method == 'POST':
        request_body = request.body.decode('utf-8')
        request_data = json.loads(request_body)  
        country_name = request_data.get('country')

        try:
            Country = country.objects.get(CountryName=country_name)
            print("Find a country - " + str(country_name))
            response_data = calculations(request_data)
            return JsonResponse(response_data)
               
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


