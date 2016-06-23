$(document).ready(function () {
    if (document.referrer.indexOf('/vol/login') > 0) {
        document.location = '/vol/wizard';
    } else if (document.referrer.indexOf('/vol/wizard') > 0) {
        $('form[name="loginForm"]').submit();
    }
});
