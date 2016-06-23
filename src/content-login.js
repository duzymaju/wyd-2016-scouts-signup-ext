var locale = '?lang=pl';
if (window.location.search !== locale) {
    window.location = window.location.pathname + locale;
}

$(document).ready(function () {
    chrome.runtime.onMessage.addListener(function (data) {
        var volunteer = data.volunteer;

        $('#username').val(volunteer.emailAlias);
        $('#password').val(volunteer.wydFormPassword);
        $('#captchaTxt').focus();
    });
});
