from django.conf.urls import url
from django.contrib.auth import views as auth_views
from login import views as login_views
from . import views

urlpatterns = [
    url(r'^login$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url(r'^logout$', auth_views.logout, {'template_name': 'logout.html'}, name='logout'),
    url(r'^signup$', login_views.signup, name='signup'),
    url(r'^success$', views.success, name='success'),
    url(r'^settings$', views.update_profile, name='settings'),
    url(r'^profile$', views.profile, name='profile'),
    url(r'^account_activation_sent/$', login_views.account_activation_sent, name='account_activation_sent'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        login_views.activate, name='activate'),
    url(r'^password_reset/$', auth_views.password_reset, name='password_reset'),
    url(r'^password_reset/done/$', auth_views.password_reset_done, name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        auth_views.password_reset_confirm, name='password_reset_confirm'),
    url(r'^reset/done/$', auth_views.password_reset_complete, name='password_reset_complete'),
    url(r'^ajax/update_photo/$', views.ajax_update_photo, name='ajax_update_photo'),
]
