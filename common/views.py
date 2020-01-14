from django.http import JsonResponse
from django.shortcuts import render
from libraries import SignInUP

# Create your views here.
def index_main(request):
    if request.method == 'POST':
        retval = {}
        username = request.POST.get('username', '')
        if request.POST.get('check', None) is not None:
            email = request.POST.get('email', '')
            location = request.POST.get('location', '')
            retval = SignInUP.create_new_user(username=username, email=email, location=location)
        else:
            is_username_in_use = SignInUP.is_username_in_use(username)
            retval = {'check': is_username_in_use}
        return JsonResponse(retval)
    else:
        return render(request, 'common/main.html')
