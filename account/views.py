from django.shortcuts import render
from libraries import twitterMagic
from django.http import JsonResponse


def account(request):
    if request.method == 'POST':
        twitter = twitterMagic.TwitterMagic()
        uid = request.GET.get('uid', '')
        twitter.get_user_handle(uid=uid)
        data = {'uid': uid}
        return JsonResponse(data)
    return render(request, 'account/account.html')
