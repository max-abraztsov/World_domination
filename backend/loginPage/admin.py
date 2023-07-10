from django.contrib import admin
from .models import country
from .models import city
#from .models import sanction

admin.site.register(country)
admin.site.register(city)
#admin.site.register(sanction)
