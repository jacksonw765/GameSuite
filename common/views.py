from django.shortcuts import render

# Create your views here.
def index_main(request):
    if request.method == 'POST':
        username = request.POST.get('username', '')
        email = request.post.get('email', '')

    return render(request, 'common/main.html')
