from django.shortcuts import render
from loginPage.models import country, city
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json

@csrf_exempt
def formsmax(request):
    if request.method == 'POST':
        choisen_countries = ["Belarus", "Ukraine", "Poland", "Lithuania"]
        all_countries = country.objects.all()

        try:
            alive_countries = 0
            for choisen_country in choisen_countries:
                Country = country.objects.get(CountryName=choisen_country)
                country_cities = city.objects.filter(country_id=Country.id)
                alive_cities = []
                
                for country_city in country_cities:
                    if country_city.state == True:
                        alive_cities.append(country_city.city_name)
                
                if len(alive_cities) != 0:
                    alive_countries += 1

            json_response_data = {
                'alive_countries': alive_countries
            }

            return JsonResponse(json_response_data)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)