function id( idName ) {
    return document.getElementById( idName );
}

function cl( className ) {
    return Array.from( document.getElementsByClassName( className ) );
}

function nm( nameName ) {
    return Array.from( document.getElementsByName( nameName ) );
}


/*** DOM ***/


function hideById( idName, hide = true ) {
    id( idName ).style.display = hide ? "none" : "";
}

function hideByClass( className, hide = true, all = true ) {
    let elements = cl( className );
    if ( all ) {
        elements.forEach( e => e.style.display = hide ? "none" : "" );
    }
    else {
        elements[0].style.display = hide ? "none" : "";
    }
}

function hideByName( nameName, hide = true, all = true ) {
    let elements = nm( nameName );
    if ( all ) {
        elements.forEach( e => e.style.display = hide ? "none" : "" );
    }
    else {
        elements[0].style.display = hide ? "none" : "";
    }
}


/*** ARRAY ***/


function remove( array, value ) {
    array.splice( array.indexOf( value ), 1 );
}

function removeObject( array, comparisonFunction ) {
    array.splice( array.findIndex( comparisonFunction ), 1 );
}

function removeAll( array, value ) {
    array = array.filter( e => e !== value );
}

function removeAllObjects( array, comparisonFunction ) {
    array = array.filter( e => !comparisonFunction(e) );
}


/*** STRING ***/


function capitalize( value ) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function camelize( value ) {
    return value.replace( /(?:^\w|[A-Z]|\b\w|\s+)/g, function( match, index ) {
        if (/\s+/.test(match)) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    } );
}


/*** AJAX ***/


function postCallEncoded( endPoint, data, successCallback, failureCallback = function(){}, asynchronous = true ) {
    return postCall( endPoint, data, successCallback, failureCallback, asynchronous, false );
}

function postCall( endPoint, data, successCallback = function(){}, failureCallback = function(){}, asynchronous = true, contentTypeJson = true ) {
    let contentType = contentTypeJson ? "application/json" : "application/x-www-form-urlencoded; charset=UTF-8"; //using contentTypeJson allows not using $_POST in php controllers
    data = contentTypeJson ? JSON.stringify( data ) : urlEncodeJson( data );

    let httpRequest = new XMLHttpRequest();
    httpRequest.open( "POST", endPoint, asynchronous );
    httpRequest.setRequestHeader( "Content-Type", contentType );
    httpRequest.onload = function() {
        if ( this.status === 200 ) {
            successCallback( jsonParse( this.responseText ) );
        }
        else {
            console.log( this.responseText );
            failCallback();
        }
    };
    httpRequest.send( data );
}

function urlEncodeJson( data ) {
    let result = [];
    for ( let key in data ) {
        const value = (typeof data[key] === "object" && data[key] !== null) ? JSON.stringify( data[key] ) : data[key];
        result.push( encodeURIComponent( key ) + "=" + encodeURIComponent( value ) );
    }
    return result.join("&");
}

function jsonParse( response ) {
    let result;
    try {
        result = JSON.parse( response );
    }
    catch ( e ) {
        result = null;
    }
    return result;
}