from django.shortcuts import render
from libraries import UserAuth, Data
from django.http import JsonResponse


def account(request):
    if request.method == 'POST':
        check_uid = request.POST.get('check', None)
        uid = request.POST.get('uid', '')
        user_auth = UserAuth.UserAuth()
        if check_uid is None:
            uid_auth = user_auth.get_auth_type(uid)
            data = {'auth': uid_auth}
            return JsonResponse(data)
        else:
            email = request.POST.get('email', '')
            twitter_handle = user_auth.get_user_handle(uid=uid)
            if not user_auth.check_uid_exists(uid=uid):
                from_twitter = user_auth.get_required_signin_data(twitter_id=uid)
                if from_twitter is not None:
                    Data.save_user(twitter_id=from_twitter.get('uid'), username=from_twitter.get('screen_name'), email=email,
                                   name=from_twitter.get('name'), location=from_twitter.get('location'), auth_type='twitter', uid=uid)
                # respond with json object
            data = {'screen_name': twitter_handle}
            return JsonResponse(data)
    return render(request, 'account/account.html')
