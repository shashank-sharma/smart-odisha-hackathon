from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework.response import Response
from complaints.models import Complaints
from collections import defaultdict
import datetime


# Dashboard for /analytics/dashboard to view data
@login_required()
def dashboard(request):
    return render(request, 'analytics_home.html', {})


def api_documentation(request):
    return render(request, 'api_documentation.html', {})

###################################################
#                                                 #
#                                                 #
#                       API                       #
#                                                 #
#                                                 #
###################################################


# TODO: Filter date and make use of +05:30
def compare_date(date_one, date_two):
    """
    Compare date, time and return boolean value
    :param date_one: Date in format: 2018-03-23 18:40:53.731846 +05:30
    :param date_two: Date in format: 2018-03-23 18:40:53.731846 +05:30
    :return:
    """
    pass


# TODO: Compare each string with given set and then only show result
# TODO: Performance issue while creating new list
# TODO: Make sure of State Codes
# TODO: Make use of Tags
# TODO: Exception Handling is extremly Important ** HIGH PRIORITY **
# TODO: Discuss and finalize the usage of API with authentication
@api_view(['GET'])
def get_complaints(request):
    get_gender = request.GET.get('gender')
    get_state = request.GET.get('state')
    get_city = request.GET.get('city')
    get_complaints_from = request.GET.get('from')
    get_complaints_to = request.GET.get('to')
    get_complaints_tags = request.GET.get('tags')
    get_week = bool(request.GET.get('week')) or False
    get_date = request.GET.get('date')
    get_resolved = bool(request.GET.get('resolved')) or False

    if not get_resolved:
        get_resolved = None

    if get_complaints_tags:
        get_complaints_tags = get_complaints_tags.split(',')

    # TODO: Comma seperated values can be seperated
    gender_list = {
        'male': 'M',
        'female': 'F',
        'others': 'O'
    }

    # TODO: Fix duplicates
    state_list = {'AN': 'Andaman and Nicobar Islands',
                  'AP': 'Andhra Pradesh',
                  'AR': 'Arunachal Pradesh',
                  'AS': 'Assam',
                  'BR': 'Bihar',
                  'CH': 'Chandigarh',
                  'CT': 'Chhattisgarh',
                  'DN': 'Dadra and Nagar Haveli',
                  'DD': 'Daman and Diu',
                  'DL': 'Delhi',
                  'GA': 'Goa',
                  'GJ': 'Gujarat',
                  'HR': 'Haryana',
                  'HP': 'Himachal Pradesh',
                  'JK': 'Jammu and Kashmir',
                  'JH': 'Jharkhand',
                  'KA': 'Karnataka',
                  'KL': 'Kerala',
                  'LD': 'Lakshadweep',
                  'MP': 'Madhya Pradesh',
                  'MH': 'Maharashtra',
                  'MN': 'Manipur',
                  'ML': 'Meghalaya',
                  'MZ': 'Mizoram',
                  'NL': 'Nagaland',
                  'OR': 'Orissa',  # Odisha OR/OD
                  'PY': 'Puducherry',
                  'PB': 'Punjab',
                  'RJ': 'Rajasthan',
                  'SK': 'Sikkim',
                  'TN': 'Tamil Nadu',
                  'TG': 'Telangana',
                  'TR': 'Tripura',
                  'UP': 'Uttar Pradesh',
                  'UT': 'Uttarakhand',  # Uttaranchal UK/UA
                  'WB': 'West Bengal'}

    # Check if all parameters passed is correct or not
    gender = gender_list[get_gender.lower()] if get_gender and get_gender.lower() in gender_list else None
    state = state_list[get_state.upper()] if get_state and get_state.upper() in state_list else None

    # TODO: Check city with given data from file if possible
    # TODO: Make use of COUNT

    if get_week:
        today = datetime.datetime.now()
        dates = [today + datetime.timedelta(days=i) for i in range(-(today.weekday()+1), 6 - today.weekday())]
        get_complaints_range = [dates[0].date(), dates[1].date()]
        get_date = None
    elif get_date:
        get_complaints_range = None
    else:
        if get_complaints_from == get_complaints_to and not get_complaints_from:
            get_complaints_range = None
        elif get_complaints_from and get_complaints_to:
            get_complaints_range = [get_complaints_from, get_complaints_to]
        else:
            if get_complaints_from:
                get_complaints_range = [get_complaints_from, str(datetime.datetime.now().date()) + ' 23:59:59']
            else:
                get_complaints_range = ['2017-01-01', get_complaints_to]

    final_complaint_list = []

    # Basic filter applied
    if get_complaints_tags:
        for tag in get_complaints_tags:
            complaint_list = Complaints.objects.myfilter(gender=gender,
                                                         state__iexact=state,
                                                         city__iexact=get_city,
                                                         complaint_date__range=get_complaints_range,
                                                         complaint_tag__icontains=tag,
                                                         complaint_date__icontains=get_date,
                                                         resolved=get_resolved)

            final_complaint_list += complaint_list
    else:
        complaint_list = Complaints.objects.myfilter(gender=gender,
                                                     state__iexact=state,
                                                     city__iexact=get_city,
                                                     complaint_date__range=get_complaints_range,
                                                     complaint_date__icontains=get_date,
                                                     resolved=get_resolved)

        final_complaint_list += complaint_list

    data = {
        'complaints': len(final_complaint_list),
        'subject_list': [subject.subject for subject in final_complaint_list],
    }
    return Response(data)


# TODO: Less than 5 tags should show dash
@api_view(['GET'])
def get_tags(request):
    tags = defaultdict(int)
    complaint_list = Complaints.objects.all()
    for complaint in complaint_list:
        for tag in complaint.get_complaint_tags():
            tags[tag] += 1
    final_dict = {
        "tags": tags,
        "top": max(tags.keys(), key=(lambda key: tags[key]))
    }
    return Response(final_dict)


@api_view(['GET'])
def get_week(request):
    final_data = {}
    temp = []
    total = 0
    today = datetime.datetime.now()
    dates = [today + datetime.timedelta(days=i) for i in range(-(today.weekday() + 1), 6 - today.weekday())]
    for date in dates:
        male_complaint_list = Complaints.objects.myfilter(gender='M',
                                                          complaint_date__icontains=date.date()).count()
        female_complaint_list = Complaints.objects.myfilter(gender='F',
                                                            complaint_date__icontains=date.date()).count()
        others_complaint_list = Complaints.objects.myfilter(gender='O',
                                                            complaint_date__icontains=date.date()).count()

        total += male_complaint_list + female_complaint_list + others_complaint_list
        temp.append({
            'male': male_complaint_list,
            'female': female_complaint_list,
            'others': others_complaint_list,
            'week': date.strftime("%A"),
            'date': date.date()
        })
    final_data['data'] = temp
    final_data['total_data'] = total
    return Response(final_data)
