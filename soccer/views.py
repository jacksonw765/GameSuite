from django.shortcuts import render

from libraries import Data


def soccer_game(request):
    return render(request, 'soccer/soccer.html')

# modified until highscore is ready to use in game
def save_score(request):
    #if request.method == 'POST':
    #highscore = request.POST.get('highscore', '')
    #uid = request.POST.get('uid', '')
    highscore = '845'
    uid = '1234'
    Data.save_highscore(uid, highscore, 'football')
