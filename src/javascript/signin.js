//https://developers.google.com/identity/sign-in/web/sign-in
let loginCallback = function() {};
let appName = "";

function setLoginAttributes( applicationCode, loginCallbackFunction ) {
    appName = applicationCode;
    loginCallback = loginCallbackFunction;
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
        "php/common-signin.php",
        {
            action:    "validateUser",
            appName:   appName,
            authToken: authToken
        },
        function( response ) {
            if ( response ) {
                loginCallback();
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