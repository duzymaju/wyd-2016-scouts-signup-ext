$(document).ready(function () {
    var volunteerIdField = $('#volunteer-id');

    var isset = function (element) {
        return typeof element !== 'undefined';
    };

    function getActiveTabIfExists(callback) {
        chrome.tabs.query({
            active: true
        }, function (tabs) {
            if (isset(tabs[0])) {
                callback(tabs[0]);
            }
        });
    }

    var credentials = (function () {
        var namespace = 'credentials';
        var onLoadCallback = null;
        var params = {
            apiToken: null,
            user: null
        };
        var storageType = 'local';

        var getApiToken = function () {
            return params.apiToken;
        };

        var getUser = function () {
            return params.user;
        };

        var areLoaded = function () {
            return params.user && params.apiToken;
        };

        var onLoad = function (callback) {
            if (areLoaded()) {
                callback();
            } else {
                onLoadCallback = callback;
            }

            return self;
        };

        var setData = function (user, apiToken, callback) {
            var data = {};
            data[namespace] = {
                apiToken: apiToken,
                user: user
            };
            chrome.storage[storageType].set(data, callback);

            return self;
        };

        chrome.storage[storageType].get(namespace, function (data) {
            if (isset(data[namespace])) {
                params.apiToken = data[namespace].apiToken;
                params.user = data[namespace].user;
            }
            if (isset(onLoadCallback)) {
                onLoadCallback();
                onLoadCallback = null;
            }
        });

        chrome.storage.onChanged.addListener(function (changes, areaName) {
            if (areaName === storageType && isset(changes[namespace])) {
                params.apiToken = changes[namespace].newValue.apiToken;
                params.user = changes[namespace].newValue.user;
            }
        });

        var self = {
            areLoaded: areLoaded,
            getApiToken: getApiToken,
            getUser: getUser,
            onLoad: onLoad,
            setData: setData
        };

        return self;
    })();

    (function (credentials) {
        var form = $('#volunteer-form');
        var view = $('#volunteer-view');
        var message = $('#volunteer-message');
        var viewList = $('#volunteer-view-list');
        var volunteer = null;

        $('#volunteer-get').on('click', function () {
            var volunteerId = parseInt(volunteerIdField.val(), 10);

            if (volunteerId > 0 && credentials.areLoaded()) {
                view.hide();
                message.text('trwa ładowanie').show();
                $.ajax({
                    url: 'https://rejestracja-sdm.zhp.pl/api/v1/volunteer/' + volunteerId,
                    data: {
                        token: credentials.getApiToken(),
                        user: credentials.getUser()
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var list = [];
                        volunteer = data.volunteer;
                        $.each(volunteer, function (key, value) {
                            list.push(key + ': ' + value);
                        });
                        viewList.text(list.join("\r\n"));
                        message.hide();
                        view.show();
                    },
                    error: function () {
                        volunteer = null;
                        message.text('nie udało się załadować danych');
                    }
                });
            }
        });

        $('#volunteer-load').on('click', function () {
            if (volunteer) {
                getActiveTabIfExists(function (tab) {
                    chrome.tabs.sendMessage(tab.id, {
                        volunteer: volunteer
                    });
                });
            }
        });
    })(credentials);

    (function (credentials) {
        var form = $('#credentials-form');
        var item = $('#credentials-item');
        var loading = $('#credentials-loading');
        var name = $('#credentials-name');
        var user = $('#credentials-user');
        var apiToken = $('#credentials-api-token');

        $('#credentials-add').on('click', function () {
            if (user.val() !== '' && apiToken.val() !== '') {
                credentials.setData(user.val(), apiToken.val(), function () {
                    user.val('');
                    apiToken.val('');
                    form.hide();
                    name.text(credentials.getUser());
                    item.show();
                });
            }
        });

        $('#credentials-remove').on('click', function () {
            credentials.setData(null, null, function () {
                item.hide();
                form.show();
            });
        });

        credentials.onLoad(function () {
            loading.hide();
            if (credentials.areLoaded()) {
                name.text(credentials.getUser());
                item.show();
            } else {
                form.show();
            }
        });
    })(credentials);
});
