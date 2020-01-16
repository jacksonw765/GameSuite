from django.shortcuts import render
from libraries import UserAuth, Data
from django.http import JsonResponse


def account(request):
    if request.method == 'POST':
        uid = request.POST.get('uid', '')
        user_auth = UserAuth.UserAuth()
        auth_type = user_auth.get_auth_type(uid)
        username = ''
        data = ''
        if auth_type == 'twitter':
            username = user_auth.get_user_handle(uid=uid)
        else:
            username = user_auth.get_username(uid=uid)

        data = {'auth': auth_type, 'username': username}
        return JsonResponse(data)
    return render(request, 'account/account.html')
