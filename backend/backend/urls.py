from django.contrib import admin
from django.urls import path
from loginPage.views import login_page
from generalData.views import general_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login_page', login_page, name='loginPage'),
    path('general_data', general_data, name='generalData')
]
