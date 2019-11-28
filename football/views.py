from django.shortcuts import render


def game_main(request):
    return render(request, 'football/index.html')
