from rest_framework import serializers
from .models import Country

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('CountryName', 'NuclearTechnology', 'NuclearRockets', 'Budget', 'Round', 'EnterCode', 'Password', 'Earnings')
