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
