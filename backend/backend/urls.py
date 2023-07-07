from django.contrib import admin
from django.urls import path
#from loginPage.views import LoginView
from loginPage import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('loginPage', views.login_page, name='loginPage'),
]
