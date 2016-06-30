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
    $(this).trigger('change');
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
