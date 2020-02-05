from django.shortcuts import render
from django.http import JsonResponse

from libraries import Data, UserAuth


def football_game(request):
    if request.method == 'POST':
        uid = request.POST.get('user', None)
        score = request.POST.get('score', None)
        retval = "Unable to save score"
        if uid is not None and score is not None:
            Data.save_highscore(uid, score, 'football')
            retval = "Score saved"
        return JsonResponse({'retval': retval})
    return render(request, 'football/football.html')

