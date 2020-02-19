from django.http import JsonResponse
from django.shortcuts import render
from libraries import UserAuth, GSLogger


def leaderboard(request):
    if request.method == 'POST':
        fb = request.POST.get('football', None)
        sc = request.POST.get('soccer', None)
        bb = request.POST.get('basketball', None)
        retval = ''
        if fb is not None:
            try:
                user_auth = UserAuth.UserAuth()
                retval = user_auth.get_football_scores()
            except Exception as e:
                GSLogger.log_error(e, "Leaderboard Football failed")
        elif sc is not None:
            try:
                user_auth = UserAuth.UserAuth()
                retval = user_auth.get_soccer_scores()
            except Exception as e:
                GSLogger.log_error(e, "Leaderboard Soccer failed")
        elif bb is not None:
            try:
                user_auth = UserAuth.UserAuth()
                retval = user_auth.get_basketball_scores()
            except Exception as e:
                GSLogger.log_error(e, "Leaderboard Basketball failed")
        GSLogger.log_event("Leaderboard request")
        return JsonResponse(retval, safe=False)
    else:
        return render(request, 'leaderboard/leaderboard.html')
