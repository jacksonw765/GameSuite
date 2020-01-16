from django.http import JsonResponse
from django.shortcuts import render
from libraries import UserAuth


# Create your views here.
def index_main(request):
    if request.method == 'POST':
        retval = {}
        user_auth = UserAuth.UserAuth()
        uid = request.POST.get('uid', '')
        username = request.POST.get('username', '')
        if request.POST.get('check', None) is None:
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
            # the wording of this method is weird so to make it accurate with our existing code we flip it
            is_username_in_use = not user_auth.is_username_in_use(username)
            retval = {'check': is_username_in_use}
        return JsonResponse(retval)
    else:
        return render(request, 'common/main.html')
