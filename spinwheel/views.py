from django.shortcuts import render


def spinwheel_game(request):
    return render(request, 'spinwheel/spinwheel.html')
# Create your views here.
