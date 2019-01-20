from django.urls import path

from . import views

urlpatterhns = [
    path('contact', views.contact, name='contact')
]