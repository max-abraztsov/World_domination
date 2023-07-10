from django.contrib import admin
from django.urls import path
from loginPage import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login_page', views.login_page, name='loginPage'), 
]
