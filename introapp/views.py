from django.shortcuts import render


# Create your views here.
def homepage(request):
    return render(request, 'home.html', {})


def types_of_cb(request):
    return render(request, 'typesofbullying.html', {})


def type_trolling(request):
    return render(request, 'trolling.html', {})


def type_trickery(request):
    return render(request, 'trickery.html', {})


def type_outing(request):
    return render(request, 'outing.html', {})


def type_harrassment(request):
    return render(request, 'harrassment.html', {})


def type_frapping(request):
    return render(request, 'frapping.html', {})


def type_fakeprofile(request):
    return render(request, 'fakeprofile.html', {})


def type_exclusion(request):
    return render(request, 'exclusion.html', {})


def type_cyberstalking(request):
    return render(request, 'cyberstalking.html', {})


def type_catphishing(request):
    return render(request, 'catphishing.html', {})


def faq(request):
    return render(request, 'faq.html', {})


def report_complaint(request):
    return render(request, 'councelling_home.html', {})


def councelling_home(request):
   return render(request, 'councelling_home.html', {})


def teen_councelling(request):
    return render(request, 'teen.html', {})


def kids_councelling(request):
    return render(request, 'kids.html', {})


def adult_councelling(request):
    return render(request, 'adult.html', {})


def cs1(request):
    return render(request, 'case_study1.html', {})



def cs2(request):
    return render(request, 'case_study2.html', {})



def cs3(request):
    return render(request, 'case_study3.html', {})



def cs4(request):
    return render(request, 'case_study4.html', {})


def about(request):
    return render(request, 'about.html', {})


