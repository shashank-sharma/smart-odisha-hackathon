from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^details/(?P<id>\d+)/$', views.details, name='details'),
    url(r'^form$', views.complaint_form, name='complaints'),
    url(r'^ajax/submit_complaints', views.ajax_form),
    url(r'^ajax/get_complaints', views.get_ajax_complaints),
    url(r'^ajax/complaint_accept', views.ajax_complaint_accept),
    url(r'^ajax/complaint_resolve', views.ajax_complaint_resolve),
    url(r'^success$', views.success, name='success_form'),
    url(r'^feedback_user/(?P<key>[a-zA-Z0-9]{20})$', views.feedback_user, name='feedback_user'),
    url(r'^complaint_status_form$', views.complaint_status_form, name='complaint_status_form'),
    url(r'^complaint_status', views.complaint_status, name='complaint_status'),
    url(r'^form/confirm/(?P<key>[a-f0-9]{32})$', views.activate_complaint, name='activate_complaint'),
]