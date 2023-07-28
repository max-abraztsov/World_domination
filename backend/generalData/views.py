from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from loginPage.models import ecology
from loginPage.models import country
from loginPage.models import city
from django.core.serializers import serialize

@csrf_exempt
def general_data(request):
    if request.method == 'POST':
        try:
            #Data about all countries
            country_object = country.objects.filter().values('CountryName', 'id')
            country_list = list(country_object)
            chosen_countries=['Belarus', 'Ukraine', 'Poland', 'Lithuania']
            AllCountries_list=[]
            for chosen in country_list:
                if chosen['CountryName'] in chosen_countries:
                    AllCountries_list.append(chosen)

            #Ecology data
            ecology_data = []
            country_ecology_object = country.objects.filter(CountryName=AllCountries_list[0]['CountryName']).values('Round')
            for round in country_ecology_object:
                country_round = round['Round']
            ecology_rounds = [1, 2, 3, 4, 5, 6]
            for ecology_round in ecology_rounds:
                one_ecology_object = ecology.objects.get(round=ecology_round)
                ecology_title = "Round " + str(one_ecology_object.round)
                one_ecology = {
                    'round': ecology_title,
                    'value': one_ecology_object.level
                }
                ecology_data.append(one_ecology)
            
            #Data about all cities
            city_object = city.objects.filter().values('city_name', 'state', 'live_level', 'country_id')
            city_list = list(city_object)
            
            #Algorithm for data writing to response
            countries=[]
            for one_country in AllCountries_list:
                cities=[]
                live_levels=[]
                for one_city in city_list:
                    if one_city['country_id'] == one_country['id']:
                        live_levels.append(one_city['live_level'])
                        city_data = {
                            'city_name': one_city['city_name'],
                            'live_level': one_city['live_level'],  
                            'city_state': one_city['state'],
                        }
                        cities.append(city_data)

                average_live_level=int(sum(live_levels)/len(live_levels))
                
                country_data = {
                    'country': one_country['CountryName'],
                    'average_live_level': average_live_level,
                    'cities': cities
                }
                countries.append(country_data)

            
            #Data for response
            response_data = {
                'ecology': ecology_data,
                'countries': countries,
            }
            return JsonResponse(response_data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)