from django.http import JsonResponse
from django.shortcuts import render
from libraries import UserAuth, GSLogger


# Create your views here.
def index_main(request):
        GSLogger.log_event("new visitor")
        return render(request, 'common/main.html')
