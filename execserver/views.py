import json
from libraries import HashtagTracker
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.http import JsonResponse
from libraries import UserAuth
from collections import Counter, OrderedDict



# Create your views here.
def server_login(request):
    return render(request, 'execserver/admin_login.html')


def login_request(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, "User logged in")
                return redirect('/admin/home')
            else:
                messages.error(request, "Invalid username or password")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request, 'execserver/admin_login.html', {"form": form})


def logout_request(request):
    logout(request)
    messages.info(request, "logged out")
    return redirect("main:homepage")


def admin_home(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            pie = request.POST.get('pieHeader', None)
            location = request.POST.get('locationHeader', None)
            twitter = request.POST.get('hashtagHeader', None)
            if pie is not None:
                auth_array = convert_auths()
                to_json = {'twitter': auth_array[0], 'user_pass': auth_array[1]}
                return JsonResponse(to_json)
            elif location is not None:
                locations = convert_locations()
                return JsonResponse(locations, safe=False)
            elif twitter is not None:
                tracker = HashtagTracker.HashtagTracker()
                tracks = tracker.track_user_hashtags()
                return JsonResponse(tracks, safe=False)
        return render(request, 'execserver/admin_home.html')
    else:
        return render(request, 'execserver/admin_denied.html')


def admin_settings(request):
    #user_auth = UserAuth.UserAuth()
    if request.user.is_authenticated:
        return render(request, 'execserver/admin_settings.html')
    else:
        return render(request, 'execserver/admin_denied.html')


def convert_auths():
    user_auth = UserAuth.UserAuth()
    auths = user_auth.get_user_auth_type()
    twitter_auth = 0
    auth_len = len(auths)
    for x in auths:
        if x == 'twitter':
            twitter_auth = twitter_auth + 1
    # return final count of auths
    return [twitter_auth, auth_len-twitter_auth]


def convert_locations():
    user_auth = UserAuth.UserAuth()
    locations = sorted(user_auth.get_user_locations())
    locations_sort = Counter(locations).most_common()
    to_json = json.dumps(locations_sort, sort_keys=False)
    return to_json


