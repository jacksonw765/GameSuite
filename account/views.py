from django.shortcuts import render
from libraries import TwitterMagic, Data
from django.http import JsonResponse


def account(request):
    if request.method == 'POST':
        twitter = TwitterMagic.TwitterMagic()
        uid = request.POST.get('uid', '')
        email = request.POST.get('email', '')
        twitter_handle = twitter.get_user_handle(uid=uid)
        if not twitter.check_uid_exists(uid=uid):
            from_twitter = twitter.get_required_signin_data(uid=uid)
            if from_twitter is not None:
                Data.save_user(uid=from_twitter.get('uid'), username=from_twitter.get('screen_name'), email=email,
                               name=from_twitter.get('name'), location=from_twitter.get('location'))
            # respond with json object
        data = {'screen_name': twitter_handle}
        return JsonResponse(data)
    return render(request, 'account/account.html')
