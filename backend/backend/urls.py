from django.contrib import admin 
from django.urls import path, include 
from loginPage.views import * 
from django.urls import re_path as url 
 
urlpatterns = [ 
    path('admin/', admin.site.urls), 
    path('login', LoginView.as_view(), name='oh shit') 
]