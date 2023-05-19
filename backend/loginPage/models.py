from django.db import models 
 
class Login(models.Model): 
    logincode = models.CharField(max_length=100) 
    password = models.CharField(max_length=100)