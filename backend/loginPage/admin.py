from django.contrib import admin
from .models import country
from .models import city
from .models import sanction
from .models import CountryList
from .models import ecology
from .models import user

admin.site.register(country)
admin.site.register(city)
admin.site.register(sanction)
admin.site.register(CountryList)
admin.site.register(ecology)
admin.site.register(user)