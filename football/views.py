from django.shortcuts import render
from django.http import JsonResponse

from libraries import Data, UserAuth, GSLogger


def football_game(request):
    if request.method == 'POST':
        uid = request.POST.get('user', None)
        score = request.POST.get('score', None)
        retval = "Unable to save score"
        if uid is not None and score is not None:
            try:
                Data.save_highscore(uid, score, 'football')
                retval = "Score saved"
            except Exception as e:
                GSLogger.log_error(e, "Save Highscore failed")
        return JsonResponse({'retval': retval})
    GSLogger.log_event("Football leaderboard save")
    return render(request, 'football/football.html')

