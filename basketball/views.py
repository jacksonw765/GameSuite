from django.shortcuts import render
from django.http import HttpResponse

from libraries import Data


def basketball_game(request):
    if request.method == 'POST':
        if request.POST.get('basketballHeader', None):
            score = request.POST.get('score', None)
            uid = request.POST.get('uid', None)
            Data.save_highscore(uid, score, 'basketball')
            return HttpResponse('')
    else:
        return render(request, 'basketball/basketball.html')


# Create your views here.
# modified until highscore is ready to use in game
def save_score(request):
    if request.method == 'POST':
        highscore = request.POST.get('highscore', '')
        uid = request.POST.get('uid', '')
        Data.save_highscore(uid, highscore, 'basketball')
