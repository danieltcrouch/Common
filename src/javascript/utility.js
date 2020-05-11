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