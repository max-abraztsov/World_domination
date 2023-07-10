from django.shortcuts import render
from .models import country
from .models import city
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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
            Country = country.objects.get(EnterCode=logincode, Password=password)
            city_objects = city.objects.filter(country_id=Country.id).values('photo', 'city_name', 'live_level', 'progress', 'profit', 'shield', 'state')
            city_list = list(city_objects)
            response_data = {
                'country': Country.CountryName,
                'flag_photo': Country.flag_photo,
                'nuclear_technology': Country.NuclearTechnology,
                'rockets': Country.NuclearRockets,
                'budget': Country.Budget,
                'ecology': 'not yet',
                'cities': city_list
            }
            return JsonResponse(response_data)
        except Country.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
