# Generated by Django 3.2.11 on 2023-07-25 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='attacked_cities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name_plural': 'Attacked_cities',
                'db_table': 'attacked_cities',
                'managed': False,
            },
        ),
    ]