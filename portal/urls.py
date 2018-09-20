"""portal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from analytics.views import get_complaints, get_tags, api_documentation, get_week   # External view import


# TODO: Come up with better implementation for API urls to make project clean
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^analytics/', include('analytics.urls')),
    url(r'^user/', include('login.urls')),
    url(r'^complaints/', include('complaints.urls')),
    url(r'^api/chart/complaint/$', get_complaints),
    url(r'^api/chart/tags/$', get_tags),
    url(r'^api/chart/week/$', get_week),
    url(r'^api/documentation$', api_documentation, name='api_documentation'),
    url(r'^', include('introapp.urls')),
]
