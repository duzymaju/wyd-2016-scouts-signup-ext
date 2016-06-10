$(document).ready(function () {
    chrome.runtime.onMessage.addListener(function (data) {
        var volunteer = data.volunteer;

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
        $('#mobilePhone').valIfEmpty(volunteer.phone);
        $('#email, #repeatEmail').valIfEmpty(volunteer.emailAlias);
        $('#community').checkElement();
        $('#instTypeTxt3').valIfEmpty(volunteer.associationName);
        $('#commLangCombo').selectElement(contactLang);
        $('#tshirtSize').selectElement(volunteer.shirtSize);
        $('#privacy').checkElement();
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

$.fn.checkElement = function () {
    $(this).parent()
        .addClass('checked')
        .trigger('click');
};
