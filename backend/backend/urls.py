from django.contrib import admin
from django.urls import path
from loginPage.views import login_page
from generalData.views import general_data
from round.views import end_round
from donate.views import donate
from attack.views import attack

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login_page', login_page, name='loginPage'),
    path('general_data', general_data, name='generalData'),
    path('round_end', end_round, name='end_of_round'),
    path('attack', attack, name='attack'),
    path('donate', donate, name='donate')
]
