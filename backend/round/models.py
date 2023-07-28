from django.db import models
from loginPage.models import city

# Create your models here.

class attacked_cities(models.Model):
    city_name = models.ForeignKey(city, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural='Attacked_cities'
        db_table='attacked_cities'
        managed = False

    def __str__(self):
        return str(self.city_name)
    
class session(models.Model):
    forms_count = models.IntegerField()
    forms_max = models.IntegerField()

    class Meta:
        verbose_name_plural='Session'
        db_table='session'
        managed = False
    
    def __str__(self):
        return "Form max: " + str(self.forms_max )