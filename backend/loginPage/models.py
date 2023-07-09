from django.db import models 
from django.core.validators import MaxValueValidator
 
class country(models.Model): 
    CountryName = models.CharField(max_length=50)
    flag_photo = models.CharField(max_length=255)
    NuclearTechnology = models.BooleanField()
    NuclearRockets = models.IntegerField(validators=[MaxValueValidator(20)])
    Budget = models.IntegerField(validators=[MaxValueValidator(10000)])
    Round = models.IntegerField(validators=[MaxValueValidator(6)])
    EnterCode = models.CharField(max_length=10) 
    Password = models.CharField(max_length=20)
    Earnings = models.IntegerField(validators=[MaxValueValidator(5000)])

    class Meta:
        verbose_name_plural='Сountry'
        db_table = 'country'

    def __str__(self):
        return self.CountryName

class city(models.Model):
    city_name = models.CharField(max_length=50)
    photo = models.CharField(max_length=250);
    live_level = models.IntegerField()
    progress = models.IntegerField()
    profit = models.IntegerField()
    shield = models.BooleanField() 
    state = models.BooleanField()
    country = models.ForeignKey(country, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural='City'
        db_table = 'city'

    def __str__(self):
        return self.city_name
    
