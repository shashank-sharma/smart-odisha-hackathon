# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-31 02:42
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('complaints', '0011_auto_20180330_1831'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaints',
            name='feedback_official',
            field=models.CharField(blank=True, max_length=800),
        ),
        migrations.AddField(
            model_name='complaints',
            name='feedback_user',
            field=models.CharField(blank=True, max_length=800),
        ),
        migrations.AddField(
            model_name='complaints',
            name='rating',
            field=models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(6), django.core.validators.MinValueValidator(0)]),
        ),
    ]
