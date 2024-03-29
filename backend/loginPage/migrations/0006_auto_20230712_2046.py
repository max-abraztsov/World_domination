# Generated by Django 3.2.11 on 2023-07-12 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loginPage', '0005_ecology'),
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entercode', models.CharField(max_length=10)),
                ('password', models.CharField(max_length=20)),
                ('role', models.CharField(choices=[('admin', 'admin'), ('president', 'president'), ('minister', 'minister')], max_length=20)),
            ],
            options={
                'verbose_name_plural': 'User',
                'db_table': 'user',
                'managed': False,
            },
        ),
        migrations.RemoveField(
            model_name='country',
            name='EnterCode',
        ),
        migrations.RemoveField(
            model_name='country',
            name='Password',
        ),
    ]
