from django.db import models 
from django.core.validators import MaxValueValidator
 
class Country(models.Model): 
    CountryName = models.CharField(max_length=50)
    NuclearTechnology = models.BooleanField()
    NuclearRockets = models.IntegerField(validators=[MaxValueValidator(20)])
    Budget = models.IntegerField(validators=[MaxValueValidator(10000)])
    Round = models.IntegerField(validators=[MaxValueValidator(6)])
    EnterCode = models.CharField(max_length=10) 
    Password = models.CharField(max_length=20)
    Earnings = models.IntegerField(validators=[MaxValueValidator(5000)])

    class Meta:
        verbose_name_plural='Сountry'
        db_table = 'сountry'
