# Generated by Django 2.2.5 on 2019-10-31 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('REST', '0004_auto_20191030_1215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='screen_name',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
