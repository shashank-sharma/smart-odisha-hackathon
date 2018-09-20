from django import forms
from django.core.validators import RegexValidator
from portal import settings

from .models import Complaints


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Complaints

        fields = ['feedback_user', 'rating']

    def __init__(self, *args, **kwargs):
        super(FeedbackForm, self).__init__(*args, **kwargs)
        self.fields['feedback_user'].widget.attrs \
            .update({
                'data-length': 800,
                'class': 'white-text',
        })


class ComplaintsForm(forms.ModelForm):
    class Meta:
        model = Complaints
        # TODO: FIX DateOfBirth default input format to dd/mm/yyyy
        # date_of_birth = forms.DateField(input_formats=settings.DATE_INPUT_FORMATS)
        fields = ['full_name',
                  'gender',
                  'date_of_birth',
                  'phone_number',
                  'email',
                  'state',
                  'city',
                  'subject',
                  'complaint',
                  'complaint_against',
                  'complaint_tag']

    def __init__(self, *args, **kwargs):
        super(ComplaintsForm, self).__init__(*args, **kwargs)
        self.fields['date_of_birth'].widget.attrs \
            .update({
                'class': 'datepicker',
            })
        self.fields['complaint'].widget.attrs \
            .update({
                'class': 'materialize-textarea',
            })
        self.fields['email'].widget.attrs \
            .update({
                'style': 'text-transform:lowercase;',
            })
        self.fields['city'].widget.attrs \
            .update({
                'class': 'city',
                'autocomplete': 'off',
            })
        self.fields['state'].widget.attrs \
            .update({
                'class': 'state',
                'autocomplete': 'off',
            })
