# Generated by Django 2.2.5 on 2019-10-30 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('REST', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='basketballleaderboard',
            name='twitter_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='footballleaderboard',
            name='score',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='footballleaderboard',
            name='twitter_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='soccerleaderboard',
            name='score',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='soccerleaderboard',
            name='twitter_id',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='user',
            name='twitter_id',
            field=models.IntegerField(),
        ),
    ]
