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
        verbose_name_plural = 'Сountry'
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
        verbose_name_plural = 'City'
        db_table = 'city'

    def __str__(self):
        return self.city_name
    
class CountryList(models.Model):
    CountryName = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'Country_list'
        db_table = 'country_list'
        managed = False
    
    def __str__(self):
        return self.CountryName


class sanction(models.Model):
    sanctionFrom = models.ForeignKey(country, on_delete=models.CASCADE, related_name='sanctions_from')
    sanctionFor = models.ForeignKey(CountryList, on_delete=models.CASCADE, related_name='sanctions_for')
    class Meta:
        verbose_name_plural='Sanctions'
        db_table = 'sanctions'
        managed = False
    
    def __str__(self):
        return str(self.sanctionFrom) + ' => ' + str(self.sanctionFor)
    
class ecology(models.Model):
    round = models.IntegerField(validators=[MaxValueValidator(6)])
    level = models.IntegerField(validators=[MaxValueValidator(100)])

    class Meta:
        verbose_name_plural='Ecology'
        db_table='ecology'
        managed = False

    def __str__(self):
        return str(self.level) + "%"