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


/*** STRING ***/


function capitalize( value ) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}


/*** AJAX ***/


function jsonParse( response ) {
    let result = null;
    try {
        result = JSON.parse( response );
    }
    catch ( e ) {
        result = null;
    }
    return result;
}