ionic.Platform.ready(function () {
    var appID = "214143325451509";
    var device = ionic.Platform.device();
    try {
        if (device && device.model) {
            console.log("doing Native fb init");
            FB.init({ appId: appID, nativeInterface: CDV.FB, useCachedDialogs: false, status: true });
        } else {
            console.log("doing non-native fb init");
            FB.init({ appId: appID, status: true});
        }

        FB.Event.subscribe('auth.authResponseChange', function (response) {
            if (response.status == 'connected') {
//                document.getElementById('token').innerHTML = response.authResponse.accessToken;
//                window.sessionStorage.token = response.authResponse.accessToken;
                console.log('logged in. AccessToken = ' + response.authResponse.accessToken);
            } else {
                console.log('Call FB.login()');
                FB.login(function () {
                }, {scope: 'email'});
            }
        });

        console.log("Get login status");
        FB.getLoginStatus();

    } catch (e) {
        console.log("fb init error" + e);
    }
});