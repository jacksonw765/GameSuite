"""gamesuite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from common.views import *
from leaderboard.views import *
from account.views import *
from execserver.views import *
from football.views import *
from soccer.views import *
from basketball.views import *

urlpatterns = [
    # admin paths
    path('django-admin/', admin.site.urls),
    path('admin/', login_request),
    path('admin/home', admin_home),
    path('admin/settings', admin_settings),

    # home
    path('', index_main),

    # user paths
    path('leaderboard/', leaderboard),
    path('account/', account),
    path('football/', football_game),
    path('soccer/', soccer_game),
    path('basketball/', basketball_game),
]


