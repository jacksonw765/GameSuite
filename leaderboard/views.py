from django.http import JsonResponse
from django.shortcuts import render
from libraries import UserAuth


def leaderboard(request):
    if request.method == 'POST':
        fb = request.POST.get('football', None)
        sc = request.POST.get('soccer', None)
        bb = request.POST.get('basketball', None)
        retval = ''
        if fb is not None:
            user_auth = UserAuth.UserAuth()
            retval = user_auth.get_football_scores()
        elif sc is not None:
            user_auth = UserAuth.UserAuth()
            retval = user_auth.get_soccer_scores()
        elif bb is not None:
            user_auth = UserAuth.UserAuth()
            retval = user_auth.get_basketball_scores()
        return JsonResponse(retval, safe=False)
    else:
        return render(request, 'leaderboard/leaderboard.html')
