# Generated by Django 3.0.3 on 2020-02-27 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('REST', '0013_logger'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tracker',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('is_auth', models.BooleanField()),
            ],
        ),
    ]
