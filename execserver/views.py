from django.shortcuts import render

# Create your views here.
def server_login(request):
    return render(request, 'execserver/login.html')