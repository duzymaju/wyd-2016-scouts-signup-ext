$(document).ready(function () {
    chrome.runtime.onMessage.addListener(function (data) {
        var volunteer = data.volunteer;

        var sexDescription = volunteer.sex === 'm' ? 'Pan' : (volunteer.sex === 'f' ? 'Pani' : '');
        var regionAndDistrict
            = volunteer.region && volunteer.district ? ' [' + volunteer.region + ', ' + volunteer.district + ']' : '';
        var contactLang = volunteer.country === 'PL' || volunteer.country === 'ES' ? volunteer.country : 'EN';

        $('select[id="reg.title"]').selectElement(sexDescription);
        $('#firstName').val(volunteer.firstName);
        $('#lastName').val(volunteer.lastName);
        $('#sex_' + volunteer.sex).checkElement();
        $('#birthDate').val(volunteer.birthDate);
        $('#postalAddress').val(volunteer.address + regionAndDistrict);
        $('#city').val(volunteer.address + regionAndDistrict);
        $('#country, #nationality, #presetMotherLangCombo').selectElement(volunteer.country);
        $('#mobilePhone').val(volunteer.phone);
        $('#email, #repeatEmail').val(volunteer.emailAlias);
        $('#community').checkElement();
        $('#instTypeTxt3').val(volunteer.associationName);
        $('#commLangCombo').selectElement(contactLang);
        $('#tshirtSize').selectElement(volunteer.shirtSize);
        $('#privacy').checkElement();
    });

    $('#tshirtSize').find('option')
        .each(function () {
            $(this).attr('value', $(this).text());
        });
});

$.fn.selectElement = function (value) {
    $(this).find('option[value="' + value + '"]')
        .prop('selected', true);
};

$.fn.checkElement = function () {
    $(this).closest('.form-group')
        .find('.gmg-radio > span')
        .removeClass('checked');
    $(this).prop('checked', true)
        .parent()
        .addClass('checked')
        .trigger('click');
};
