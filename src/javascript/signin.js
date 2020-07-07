//https://developers.google.com/identity/sign-in/web/sign-in
let loginAttributes = {
    callback: function() {},
    appName:  ""
};

function setLoginAttributes( applicationCode, loginCallbackFunction ) {
    loginAttributes.appName = applicationCode;
    loginAttributes.appName = loginCallbackFunction;
}

function onSignIn( googleUser, createNew = true ) {
    if ( googleUser ) {
        validateUser(
            googleUser.getAuthResponse().id_token,
            createNew
        );
    }

}

function initializeUser() {
    gapi.load( 'auth2', function() {
        gapi.auth2.init().then( function( auth2 ){
            onSignIn( auth2.currentUser.get(), false );
        } );
    } );
}

function validateUser( authToken ) {
    postCallEncoded(
        "https://religionandstory.com/common/php/common-signin.php",
        {
            action:    "validateUser",
            appName:   loginAttributes.appName,
            authToken: authToken
        },
        function( response ) {
            if ( response ) {
                loginAttributes.callback();
            }
            else {
                failCallback();
            }
        },
        failCallback
    );
}

function failCallback() {
    let currentLocation = location.href;
    currentLocation = currentLocation.replace( /www|\/index.php.*/gi, "" );
    let homePage = location.origin
    if ( !( currentLocation === homePage || currentLocation === (homePage + "/") ) ) {
        location.replace( homePage );
    }
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( function() {
        console.log( "User signed out." );
        failCallback();
    } );
}