function id( idName ) {
    return document.getElementById( idName );
}

function cl( className ) {
    return document.getElementsByClassName( className );
}

function nm( nameName ) {
    return document.getElementsByName( nameName );
}


/*** STRING ***/


function capitalize( value ) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}