from django.contrib import admin
from REST import models

# Register your models here.
admin.site.register(models.Logger)
admin.site.register(models.Tracker)