from django.shortcuts import render
from libraries import twitterMagic
from django.http import JsonResponse


def account(request):
    if request.method == 'POST':
        twitter = twitterMagic.TwitterMagic()
        retval = twitter.get_user_handle(uid=request.POST.get('uid', ''))
        data = {'screen_name': retval}
        return JsonResponse(data)
    return render(request, 'account/account.html')
