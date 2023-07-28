from django.contrib import admin
from .models import attacked_cities, session

# Register your models here.
admin.site.register(attacked_cities)
admin.site.register(session)