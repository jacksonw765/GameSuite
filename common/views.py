from django.http import JsonResponse
from django.shortcuts import render
from libraries import UserAuth


# Create your views here.
def index_main(request):
        return render(request, 'common/main.html')
