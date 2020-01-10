from django.shortcuts import render
from libraries import Data


def game_main(request):
    save_score()
    return render(request, 'football/index.html')


def save_score(request):
    if request.method == 'POST':
        highscore = request.POST.get('highscore', '')
        uid = request.POST.get('uid', '')
        Data.save_highscore(uid, highscore, 'football')
