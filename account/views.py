from django.shortcuts import render
from libraries import UserAuth, Data
from django.http import JsonResponse


def account(request):
    if request.method == 'POST':
        user_auth = UserAuth.UserAuth()
        uid = request.POST.get('uid', None)
        check = request.POST.get('check', None)
        auth_method = request.POST.get('auth_method', None)
        auth_type = request.POST.get('auth_type', None)
        if auth_type is not None:
            auth_type = user_auth.get_auth_type(uid)
            username = ''
            data = ''
            if auth_type == 'twitter':
                username = user_auth.get_user_handle(uid=uid)
            else:
                username = user_auth.get_username(uid=uid)
            data = {'auth': auth_type, 'username': username}
            return JsonResponse(data)
        elif request.POST.get('auth_type', None) is not None:
            retval = {}
            username = request.POST.get('username', 'undefined')
            if not user_auth.check_uid_exists(uid=uid):
                twitter_id = request.POST.get('twitter_id', None)
                auth_type = request.POST.get('auth_type', '')
                email = request.POST.get('email', '')
                location = request.POST.get('location', None)
                name = request.POST.get('name', None)
                if auth_type == 'twitter':
                    location_updated = user_auth.get_user_location(twitter_id=twitter_id)
                    if location_updated != '':
                        location = location_updated
                    username = user_auth.get_twitter_screen_name(twitter_id=twitter_id)
                retval = user_auth.create_new_user(username=username, email=email, location=location, uid=uid,
                                                   twitter_id=twitter_id, name=name, auth_type=auth_type)
        else:
            username = request.POST.get('username', 'undefined')
            is_username_in_use = not user_auth.is_username_in_use(username)
            retval = {'check': is_username_in_use}
        return JsonResponse(retval)
    return render(request, 'account/account.html')
