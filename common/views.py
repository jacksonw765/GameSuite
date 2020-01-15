from django.http import JsonResponse
from django.shortcuts import render
from libraries import SignInUP

# Create your views here.
def index_main(request):
    if request.method == 'POST':
        retval = {}
        username = request.POST.get('username', '')
        if request.POST.get('check', None) is None:
            email = request.POST.get('email', '')
            location = request.POST.get('location', '')
            retval = SignInUP.create_new_user(username=username, email=email, location=location)
        else:
            # the wording of this method is weird so to make it accurate with our existing code we flip it
            is_username_in_use = not SignInUP.is_username_in_use(username)
            retval = {'check': is_username_in_use}
        return JsonResponse(retval)
    else:
        return render(request, 'common/main.html')
