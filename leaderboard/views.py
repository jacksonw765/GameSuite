from django.http import JsonResponse
from django.shortcuts import render
from libraries import UserAuth

def leaderboard(request):
    if request.method == 'POST':
        fb = request.POST.get('football', None)
        if fb is not None:
            user_auth = UserAuth.UserAuth()
            to_json = user_auth.get_football_scores()
            print(to_json)
            return JsonResponse(to_json, safe=False)
    return render(request, 'leaderboard/leaderboard.html')