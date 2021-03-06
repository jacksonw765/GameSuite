# Generated by Django 2.2.5 on 2020-01-14 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('REST', '0005_auto_20191030_2207'),
    ]

    operations = [
        migrations.RenameField(
            model_name='footballleaderboard',
            old_name='twitter_id',
            new_name='user_id',
        ),
        migrations.RenameField(
            model_name='soccerleaderboard',
            old_name='twitter_id',
            new_name='user_id',
        ),
        migrations.RemoveField(
            model_name='basketballleaderboard',
            name='twitter_id',
        ),
        migrations.AddField(
            model_name='basketballleaderboard',
            name='user_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='auth_type',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='activity',
            name='twitter_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='footballleaderboard',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='twitter_id',
            field=models.IntegerField(null=True),
        ),
    ]
