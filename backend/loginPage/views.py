from django.shortcuts import render
from django.db.models import Q
from backend import settings
from .models import country
from .models import city
from .models import ecology
from .models import sanction
from .models import CountryList
from .models import user
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import jwt

def generate_jwt_token(payload):
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token


@csrf_exempt
def login_page(request):
    if request.method == 'POST':
        
        login_body = request.body.decode('utf-8')
        login_data = json.loads(login_body)
        logincode = login_data.get('logincode')

        pass_body = request.body.decode('utf-8')
        pass_data = json.loads(pass_body)
        password = pass_data.get('password')
                
        try:
            User = user.objects.get(entercode=logincode, password=password)
            
            #data about country
            Country = country.objects.get(id=User.country_id)
            
            is_president = False
            if User.role == 'president':
                is_president = True
            
            #data about cities of country
            city_objects = city.objects.filter(country_id=Country.id).values('photo', 'city_name', 'live_level', 'progress', 'profit', 'shield', 'state')
            city_list = list(city_objects)

            #average live level of cities
            cities=[]
            for one_city in city_list:
                if (one_city['state']==True):
                    cities.append(one_city['live_level'])

            average_live_level = int(sum(cities)/len(cities))

            #ecology
            ecology_object = ecology.objects.filter(round=Country.Round).values('level')
            for eco_level in ecology_object:
                ecology_level = eco_level['level']

            #Data about other countries
            OthersCountries_objects = country.objects.filter(~Q(CountryName=Country.CountryName)).values('id', 'CountryName')
            OthersCountries_fulllist = list(OthersCountries_objects)
            chosen_countries=['Belarus', 'Ukraine', 'Poland', 'Lithuania']
            OthersCountries_list=[]
            for chosen in OthersCountries_fulllist:
                if chosen['CountryName'] in chosen_countries:
                    OthersCountries_list.append(chosen)
            

            #Data about other cities
            OthersCities_objects = city.objects.filter(~Q(country_id=Country.id)).values('city_name', 'state', 'country_id')
            OthersCities_list = list(OthersCities_objects)

            other_countries=[]
            for other_country in OthersCountries_list:
                other_cities=[]
                for other_city in OthersCities_list:
                    if other_city['country_id'] == other_country['id']:
                        city_data = {key: value for key, value in other_city.items() if key != 'country_id'}
                        other_cities.append(city_data)

                
                country_from_list_object = CountryList.objects.filter(CountryName=other_country['CountryName']).values('id')
                for id_from_list in country_from_list_object:
                    id_country_from_list = id_from_list['id']

                sanctions=False
                sanctions_object = sanction.objects.filter(sanctionFrom_id=Country.id, sanctionFor_id=id_country_from_list)
                if sanctions_object.exists():
                    sanctions=True

                sanctions_from=False
                sanctionsFrom_object = sanction.objects.filter(sanctionFrom_id=id_country_from_list, sanctionFor_id=Country.id)
                if sanctionsFrom_object.exists():
                    sanctions_from=True
                
                
                other_country_data = {
                    'country': other_country['CountryName'],
                    'sanctions': sanctions,
                    'sanctions_from': sanctions_from,
                    'cities': other_cities
                }
                other_countries.append(other_country_data)

            
            response_data = {
                'is_president': is_president,
                'country': Country.CountryName,
                'flag_photo': Country.flag_photo,
                'average_live_level': average_live_level,
                'nuclear_technology': Country.NuclearTechnology,
                'rockets': Country.NuclearRockets,
                'budget': Country.Budget,
                'ecology': ecology_level,
                'cities': city_list,
                'enemies': other_countries
            }

            #token = generate_jwt_token(response_data)

            return JsonResponse(response_data)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
