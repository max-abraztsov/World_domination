from django.shortcuts import render
from loginPage.models import country
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def donate(request):
    if request.method == 'POST':
        request_data = json.loads(request.body)
        donate_from = request_data.get('from')
        donate_to = request_data.get('to')
        donate_amount = request_data.get('amount')

        
        
        country_from = None
        country_to = None

        try:
            country_from = country.objects.get(CountryName=donate_from)
            country_to = country.objects.get(CountryName=donate_to)
            
            country_from.Budget -= donate_amount
            country_to.Budget += donate_amount

            country_from.save()   
            country_to.save()       

            print("Money transfer in " + str(donate_amount) + " from " + str(donate_from) + " to " + str(donate_to))

            return JsonResponse({'budget': country_from.Budget}) 
        except country.DoesNotExist:
            if country_from is None:
                return JsonResponse({'error': 'Country[from] not found'}, status=404)
            elif country_to is None:
                return JsonResponse({'error': 'Country[to] not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


