# Generated by Django 4.2.4 on 2023-08-19 15:24

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loginPage', '0006_auto_20230712_2046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='Round',
            field=models.IntegerField(validators=[django.core.validators.MaxValueValidator(7)]),
        ),
    ]
