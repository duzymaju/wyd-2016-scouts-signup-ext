$(document).ready(function () {
    chrome.runtime.onMessage.addListener(function (data) {
        var volunteer = data.volunteer;

        if ($('#email').val() === '' || $('#email').val() === volunteer.emailAlias || confirm('Adres e-mail z formularza (' + $('#email').val() + ') jest niezgodny z adresem pobranym z API (' + volunteer.emailAlias + ')! Prawdopodobnie wybrany ID wolontariusza jest niepoprawny. Czy na pewno chcesz kontynuować?')) {
            var sexDescription = volunteer.sex === 'm' ? 'Pan' : (volunteer.sex === 'f' ? 'Pani' : '');
            var regionAndDistrict
                = volunteer.region && volunteer.district ? ' [' + volunteer.region + ', ' + volunteer.district + ']' : '';
            var contactLang = volunteer.country === 'PL' || volunteer.country === 'ES' ? volunteer.country : 'EN';

            $('select[id="reg.title"]').selectElement(sexDescription);
            $('#firstName').valIfEmpty(volunteer.firstName);
            $('#lastName').valIfEmpty(volunteer.lastName);
            $('#sex_' + volunteer.sex).checkElement();
            $('#birthDate').valIfEmpty(volunteer.birthDate);
            $('#postalAddress').valIfEmpty(volunteer.address + regionAndDistrict);
            $('#city').valIfEmpty(volunteer.address + regionAndDistrict);
            $('#country, #nationality, #presetMotherLangCombo').selectElement(volunteer.country);
            $('#fiscalCode').valIfEmpty(volunteer.pesel);
            $('#familyName').valIfEmpty(volunteer.fatherName);
            $('#mobilePhone').setPhone($('#prefixMobilePhone'), volunteer.phone);
            $('#email, #repeatEmail').valIfEmpty(volunteer.emailAlias);
            $('#community').checkElement();
            $('#instTypeTxt3').valIfEmpty(volunteer.associationName);
            $('#commLangCombo').selectElement(contactLang);
            $('#emerContactFirstname').valIfEmpty(volunteer.emergencyContactFirstName);
            $('#emerContactLastname').valIfEmpty(volunteer.emergencyContactLastName);
            $('#emerContactEmail').valIfEmpty(volunteer.emergencyContactEmail);
            $('#emerContactRelationship').valIfEmpty(volunteer.emergencyContactRelationship);
            $('#emerContactCountry').selectElement(volunteer.emergencyContactCountry);
            $('#emerContactMobilephone').setPhone($('#emerContactPreMobilephone'), volunteer.emergencyContactPhone);
            $('#tshirtSize').selectElement(volunteer.shirtSize);
            $('#privacy').checkElement();
        }
    });

    $('#tshirtSize').find('option')
        .each(function () {
            $(this).attr('value', $(this).text());
        });
});

$.fn.valIfEmpty = function (value) {
    $(this).each(function () {
        if ($(this).val() === '') {
            $(this).val(value);
        }
    });
};

$.fn.selectElement = function (value) {
    $(this).find('option[value="' + value + '"]')
        .prop('selected', true);
};

$.fn.setPhone = function (prefixSelect, phone) {
    var phoneInput = $(this);
    var phoneSet = false;
    prefixSelect.find('option').each(function () {
        var prefix = $(this).val();
        if (prefix && prefix !== '' && phone.substr(0, prefix.length) === prefix) {
            prefixSelect.selectElement(prefix);
            phoneInput.val(phone.substr(prefix.length));
            phoneSet = true;
        }
    });
    if (!phoneSet) {
        phoneInput.valIfEmpty(phone);
    }
};

$.fn.checkElement = function () {
    $(this).parent()
        .addClass('checked')
        .trigger('click');
};
