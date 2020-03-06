from django.http import JsonResponse
from django.shortcuts import render
from libraries import UserAuth, GSLogger, Data


# Create your views here.
def index_main(request):
    if request.method == 'POST':
        auth = request.POST.get('isUserAuth', None)
        if auth is not None:
            is_auth = ''
            if auth == 'true':
                is_auth = True
            else:
                is_auth = False
            GSLogger.log_visit(is_auth)
    GSLogger.log_event("new visitor")
    return render(request, 'common/main.html')
