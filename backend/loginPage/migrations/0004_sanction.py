# Generated by Django 3.2.11 on 2023-07-11 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loginPage', '0003_сountrylist'),
    ]

    operations = [
        migrations.CreateModel(
            name='sanction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name_plural': 'Sanctions',
                'db_table': 'sanctions',
                'managed': False,
            },
        ),
    ]
