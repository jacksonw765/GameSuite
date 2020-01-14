from django.http import JsonResponse
from django.shortcuts import render
from libraries import SignInUP

# Create your views here.
def index_main(request):
    if request.method == 'POST':
        username = request.POST.get('username', '')
        email = request.POST.get('email', '')
        location = request.POST.get('location', '')
        retval = SignInUP.create_new_user(username=username, email=email, location=location)
        return JsonResponse(retval)
    else:
        return render(request, 'common/main.html')
