$(document).on( "click", "#helpIcon", showInstructions );
$(document).on( "click", ".inverseButton", clickRadioButton );
$(document).on( "click", ".inverseTab", selectTabButton );


/*****************DISPLAY*****************/


function docReady( fn ) {
    if ( document.readyState === "complete" || document.readyState === "interactive" ) {
        setTimeout( fn, 1 );
    }
    else {
        document.addEventListener( "DOMContentLoaded", fn );
    }
}

function hide( obj ) {
    show( obj, false );
}

function show( obj, isShow = true, displayType = "" ) {
    let element = null;
    if ( typeof obj === "string" ) {
        element = id( obj );
    }
    else if ( obj instanceof Element ) {
        element = obj;
    }
    else if ( Array.isArray( obj ) ) {
        obj.forEach( o => show( o, isShow, displayType ) );
    }

    if ( element && element.style ) {
        element.style.display = isShow ? displayType : "none";
    }
}

function showInstructions( e )
{
    showMessage( "Instructions", $('#helpText').html() );
}

function scrollToId( id )
{
    var hash = "#" + id;
    $('html, body').animate(
        { scrollTop: $(hash).offset().top },
        800,
        function(){ window.location.hash = hash; }
    );
}


/******************SELECT******************/


const NONE_OPTION   = {text: "None", value: null};
const SELECT_OPTION = {text: "Select One", value: null};

function chooseSelectOptionValue( elementId, value )
{
    if ( value ) {
        id( elementId ).value = value;
    }
}

function chooseSelectOptionIndex( elementId, index )
{
    if ( index ) {
        id( elementId ).selectedIndex = index;
    }
}

function getSelectedOption( elementId )
{
    let result = null;
    let select = id( elementId );
    if ( select.selectedIndex >= 0 )
    {
        let option = select.options[select.selectedIndex];
        result = {
            index: select.selectedIndex,
            text:  option.text,
            value: option.value
        };
    }
    return result;
}

function getSelectedOptionValue( elementId )
{
    let selectOption = getSelectedOption( elementId );
    return ( selectOption && selectOption.value ) ? selectOption.value : null;
}

function removeSelectOptions( elementId )
{
    let select = id( elementId );
    const currentCount = select.options.length;
    for ( let i = currentCount - 1; i >= 0; i-- ) {
        select.remove( i );
    }
}

function addToSelect( elementId, option )
{
    let select = id( elementId );
    addToSelectElement( select, option );
}

function addToSelectElement( select, option )
{
    let optionElement = document.createElement("option");
    optionElement.text = option.text || option;
    optionElement.value = option.value || option;
    select.add( optionElement );
}

function addAllToSelect( elementId, options )
{
    removeSelectOptions( elementId );
    let select = id( elementId );
    const optionsCount = options.length;
    for ( let i = 0; i < optionsCount; i++ ) {
        addToSelectElement( select, options[i] );
    }
}


/******************RADIO******************/


function clickRadioButton( e )
{
    updateRadioButtonGroup( e.target.id );
}

function updateRadioButtonGroup( buttonId )
{
	var clickedButton = id(buttonId);
	var groupName = clickedButton.name;
	var allButtons = nm(groupName);
    allButtons.forEach( function( button ) {
        if ( button.id === clickedButton.id )
        {
            selectRadioButton( button.id );
        }
        else
        {
            deselectRadioButton( button.id );
        }
    });
}

function selectRadioButton( buttonId, frozen = false )
{
    removeSelectButtonClasses( buttonId );
    id(buttonId).classList.add( getSelectButtonClass( true, frozen ) );
}

function deselectRadioButton( buttonId, frozen = false )
{
    removeSelectButtonClasses( buttonId );
    id(buttonId).classList.add( getSelectButtonClass( false, frozen ) );
}

function toggleRadioButton( buttonId, frozen = false )
{
    let button = id(buttonId);
    const isSelected = button.classList.contains( "selectedButton" ) || button.classList.contains( "staticSelectedButton" );
    removeSelectButtonClasses( buttonId );
    button.classList.add( getSelectButtonClass( !isSelected, frozen ) );
}

function removeSelectButtonClasses( buttonId )
{
    id(buttonId).classList.remove( "selectedButton" );
    id(buttonId).classList.remove( "inverseButton" );
    id(buttonId).classList.remove( "staticSelectedButton" );
    id(buttonId).classList.remove( "staticInverseButton" );
}

function getSelectButtonClass( isSelected, isFrozen )
{
    return isFrozen ?
        (isSelected ? "staticSelectedButton" : "staticInverseButton") :
        (isSelected ? "selectedButton"       : "inverseButton");
}

function unfreezeRadioButtons( groupName, buttonIds )
{
    var allButtons = ( groupName ) ? $('button[name=' + groupName + ']').toArray() :
                     ( buttonIds ) ? buttonIds.map( buttonId => id( buttonId ) ) : [];
    allButtons.forEach( function( button ) {
        const isSelected = button.classList.contains( "selectedButton" ) || button.classList.contains( "staticSelectedButton" );
        button.classList.remove( "selectedButton" );
        button.classList.remove( "inverseButton" );
        button.classList.remove( "staticSelectedButton" );
        button.classList.remove( "staticInverseButton" );
        var classToAdd = isSelected ? "selectedButton" : "inverseButton";
        button.classList.add( classToAdd );
    });
}

function freezeRadioButtons( groupName, buttonIds )
{
    var allButtons = ( groupName ) ? $('button[name=' + groupName + ']').toArray() :
                     ( buttonIds ) ? buttonIds.map( buttonId => id( buttonId ) ) : [];
    allButtons.forEach( function( button ) {
        const isSelected = button.classList.contains( "selectedButton" ) || button.classList.contains( "staticSelectedButton" );
        button.classList.remove( "selectedButton" );
        button.classList.remove( "inverseButton" );
        button.classList.remove( "staticSelectedButton" );
        button.classList.remove( "staticInverseButton" );
        var classToAdd = isSelected ? "staticSelectedButton" : "staticInverseButton";
        button.classList.add( classToAdd );
    });
}

function deselectAllRadioButtons( groupName )
{
    var allButtons = $('button[name=' + groupName + ']').toArray();
    allButtons.forEach( function( button ) {
        if ( button.classList.contains( "selectedButton" ) )
        {
            button.classList.remove( "selectedButton" );
            button.classList.add( "inverseButton" );
        }
    });
}

function getSelectedRadioButton( groupName )
{
    var result = null;
	var allButtons = $('button[name=' + groupName + ']').toArray();
    allButtons.forEach( function( button ) {
        if ( button.classList.contains( "selectedButton" ) ||
             button.classList.contains( "staticSelectedButton" ) )
        {
            result = button;
        }
    });
    return result;
}

function getSelectedRadioButtonId( groupName )
{
    var result = getSelectedRadioButton( groupName );
    return result ? result.id : null;
}

function setRadioCallback( groupName, callback )
{
    $(document).on( "click", "button[name=" + groupName + "]", function(){callback( $(this).attr("id") );} );
}


/*******************TAB*******************/


function selectTabButton( e )
{
	var clickedButton = e.target;
	var groupName = clickedButton.attributes["name"].value;
	var allButtons = $('button[name=' + groupName + ']').toArray();
    allButtons.forEach( function( button ) {
        if ( button.id === clickedButton.id )
        {
            button.classList.add( "selectedTab" );
            button.classList.remove( "inverseTab" );
        }
        else
        {
            button.classList.add( "inverseTab" );
            button.classList.remove( "selectedTab" );
        }
    });
}

function deselectAllTabButtons( groupName )
{
    var allButtons = $('button[name=' + groupName + ']').toArray();
    allButtons.forEach( function( button ) {
        if ( button.classList.contains( "selectedTab" ) )
        {
            button.classList.remove( "selectedTab" );
            button.classList.add( "inverseTab" );
        }
    });
}

function getSelectedTabButton( groupName )
{
    var result = null;
	var allButtons = $('button[name=' + groupName + ']').toArray();
    allButtons.forEach( function( button ) {
        if ( button.classList.contains( "selectedTab" ) )
        {
            result = button;
        }
    });
    return result;
}

function getSelectedTabButtonId( groupName )
{
    var result = getSelectedTabButton( groupName );
    return result ? result.id : null;
}

function setTabCallback( groupName, callback )
{
    $(document).on( "click", "button[name=" + groupName + "]", function(){callback( this.id );} );
}

function setTabCallbackToDisplay( groupName )
{
    setTabCallback( groupName, function( tabId ) { displayOnlyTab( tabId ); } );
}

function setTabCallbackToDisplayByGroup( groupName )
{
    setTabCallback( groupName, function( tabId ) { displayOnlyTab( tabId, groupName ); } );
}

function getTabIds( groupName )
{
    //Returns them in order of the Buttons
    return  $('button[name=' + groupName + ']').map( function() { return this.id; } ).get();
}

function getTabs( groupName )
{
    var tabs = $("div.tab");
    if ( groupName )
    {
        tabs = tabs.filter( "." + groupName + "Tab" );
    }
    return tabs;
}

function displayOnlyTab( tabId, groupName )
{
    hideAllTabs( groupName );
    $( "div#" + tabId + ".tab" ).show();
}

function hideAllTabs( groupName )
{
    var tabs = getTabs( groupName );
    tabs.hide();
}

function displayNextTab( groupName )
{
    var selectedTabId = getSelectedTabButtonId( "setup" );
    var tabIds = getTabIds( groupName );
    var nextTabId = tabIds[ ( selectedTabId ) ? ( tabIds.indexOf( selectedTabId ) + 1 ) % tabIds.length : 0 ];
    $('button#' + nextTabId)[0].click();
}

function openTab( tabId )
{
    $( "div#" + tabId + ".tab" ).show();
}

function closeTab( tabId )
{
    $( "div#" + tabId + ".tab" ).hide();
}


/******************MODAL******************/


function blurBackground()
{
    $('body').addClass( "blur" );
}

function closeModalJS( modalId )
{
    closeModal( $('#' + modalId) );
}

function closeModal( modal )
{
    $('body').removeClass( "blur" );
    modal.find('#modalBody').removeAttr( 'style' );
    modal.hide();
}

function setCloseHandlersJS( modalId, cancel, submit )
{
    setCloseHandlers( $('#' + modalId), cancel, submit );
}

function setCloseHandlers( modal, cancel, submit )
{
    let defaultClose = function() { closeModal( modal ) };
    cancel = cancel || defaultClose;
    submit = submit || cancel;

    let submitButton = modal.find('#submitButton');
    submitButton.off( "click" );
    submitButton.click( submit );
    let cancelButton = modal.find('#cancelButton');
    cancelButton.off( "click" );
    cancelButton.click( cancel );

    var prompt = modal.find('#prompt');
    if ( prompt && prompt.is( "input" ) )
    {
        prompt.off( "keyup" );
        prompt.keyup( function(e) {
            if ( e.keyCode === 13 || e.which === 13 ) {
                submit();
            }
        });
    }

    modal.find('.close').off( "click" ); //Close (X) Button
    modal.find('.close').click( cancel );

    $(window).off( "click" );
    $(window).click(function(e) {
        if ( e.target.parentNode.id === modal.attr("id") ) {
            cancel();
        }
    });
}

function showMessage( headerText, message, style )
{
    var modal = $('#modal');
    var header = modal.find('#modalHeader');
    var body = modal.find('#modalBody');

    header.text( headerText );
    body.html( message );
    if ( style )
    {
        body.css( style );
    }

    modal.show();

    setCloseHandlers( modal );
    blurBackground();
}

function showConfirm( headerText, message, callback, style )
{
    var modal = $('#modal');
    var header = modal.find('#modalHeader');
    var body = modal.find('#modalBody');
    var submit = modal.find('#modalSubmit');

    header.text( headerText );
    body.html( message );
    if ( style )
    {
        body.css( style );
    }

    submit.show();
    modal.show();

    document.activeElement.blur();
    $(document).on( "keypress.modalNamespace", function(e){
    	if ( e.keyCode === 13 || e.which === 13 ) {
    		confirm();
    	}
    });

    function close( answer )
    {
        $(document).off( "keypress.modalNamespace" );
        submit.hide();
        closeModal( modal );
        callback( answer === true );
    }

    function confirm()
    {
        close( true );
    }

    setCloseHandlers( modal, close, confirm );
    blurBackground();
}

function showNumberPrompt( headerText, message, callback, placeholder )
{
    showPrompt( headerText, message, callback, placeholder, true );
}

function showPrompt( headerText, message, callback, placeholder, isNumber, style )
{
    var modal = $('#promptModal');
    var header = modal.find('#modalHeader');
    var body = modal.find('#modalBody');
    var prompt = modal.find('#prompt');

    header.text( headerText );
    prompt.attr( "placeholder", placeholder );
    prompt[0].type = isNumber ? "number" : "text";
    body.html( message );
    if ( style )
    {
        body.css( style );
    }

    modal.show();
    prompt.focus();

    function clear()
    {
        var value = prompt.val();

        closeModal( modal );
        prompt.val( "" );

        return value;
    }

    function close()
    {
        clear();
        callback();
    }

    function submit()
    {
        var value = clear();
        callback( value );
    }

    setCloseHandlers( modal, close, submit );
    blurBackground();
}

function showBigPrompt( headerText, message, callback, value, clearAfterward, style )
{
    var modal = $('#bigPromptModal');
    var header = modal.find('#modalHeader');
    var body = modal.find('#modalBody');
    var prompt = modal.find('#prompt');

    header.text( headerText );
    prompt.val( value );
    body.html( message );
    if ( style )
    {
        body.css( style );
    }

    modal.show();
    prompt.focus();

    function clear()
    {
        closeModal( modal );

        var value = prompt.val();
        if ( clearAfterward )
        {
            prompt.val( "" );
        }
        return value;
    }

    function close()
    {
        clear();
    }

    function submit()
    {
        var value = clear();
        callback( value );
    }

    setCloseHandlers( modal, close, submit );
    blurBackground();
}


/*****************MODAL NEW*****************/


function showBinaryChoice( headerText, message, leftChoice, rightChoice, callback ) {
    showChoices( headerText, message, [leftChoice, rightChoice], callback );
}

function showChoices( headerText, messageText, choiceTexts, callback ) {
    const modal = id( 'choiceModal' );
    const header  = modal.querySelector( '#modalHeader' );
    const message = modal.querySelector( '#modalMessage' );
    const choices = modal.querySelector( '#modalChoices' );

    header.innerText = headerText;
    message.innerText = messageText;

    function clear() {
        choices.innerHTML = "";
        closeModalJS( modal.id );
    }

    function close() {
        clear();
        callback( null );
    }

    for ( let i = 0; i < choiceTexts.length; i++ ) {
        const text = choiceTexts[i];
        let button = document.createElement( "BUTTON" );
        button.innerText = text;
        button.style.width = "8em";
        button.style.margin = ".5em .5em";
        button.classList.add( "button" );
        button.onclick = function() {
            clear();
            callback( i );
        };
        choices.appendChild( button );
    }

    setCloseHandlersJS( modal.id, close );

    show( modal, true, "block" );
    blurBackground();
}

function showPicks( headerText, messageText, pickTexts, allowMultiple, allowSelectAllOrNone, callback ) {
    const modal = id( 'pickModal' );
    const header  = modal.querySelector( '#modalHeader' );
    const message = modal.querySelector( '#modalMessage' );
    const picks   = modal.querySelector( '#modalPicks' );

    picks.innerHTML = "";
    header.innerText = headerText;
    message.innerText = messageText;
    if ( allowMultiple && allowSelectAllOrNone ) {
        let div = document.createElement( "DIV" );
        let input = document.createElement( "INPUT" );
        input.id = "pickSelectAll";
        input.type = "checkbox";
        input.onclick = function() { nm('picks').forEach( i => {
            if ( !i.disabled ) {
                i.checked = this.checked
            }
        } ); };
        let label = document.createElement( "LABEL" );
        label.htmlFor = "pickSelectAll";
        label.innerHTML = "Select All";
        div.appendChild( input );
        div.appendChild( label );
        picks.appendChild( div );
    }
    for ( let i = 0; i < pickTexts.length; i++ ) {
        let text = pickTexts[i];
        let disabled = false;
        let checked = false;
        if ( typeof text === "string" ) {
            text = text.value || text;
            disabled = text.disabled || disabled;
            checked = text.checked || checked;
        }

        const id = "pick-" + i;
        let div = document.createElement( "DIV" );
        let input = document.createElement( "INPUT" );
        input.id = id;
        input.name = "picks";
        input.type = allowMultiple ? "checkbox" : "radio";
        input.disabled = disabled;
        input.checked = checked;
        let label = document.createElement( "LABEL" );
        label.htmlFor = id;
        label.innerHTML = text;
        div.appendChild( input );
        div.appendChild( label );
        picks.appendChild( div );
    }
    if ( !allowMultiple && allowSelectAllOrNone ) {
        let div = document.createElement( "DIV" );
        let input = document.createElement( "INPUT" );
        input.id = "pickNone";
        input.name = "picks";
        input.type = "radio";
        let label = document.createElement( "LABEL" );
        label.htmlFor = "pickNone";
        label.innerHTML = "None";
        div.appendChild( input );
        div.appendChild( label );
        picks.appendChild( div );
    }

    function clear() {
        if ( allowMultiple && allowSelectAll ) {
            id('pickSelectAll').checked = false;
        }
        nm('picks').forEach( i => i.checked = false );
        closeModalJS( modal.id );
    }

    function close() {
        clear();
        callback( null );
    }

    function submit() {
        let result;
        if ( allowMultiple ) {
            result = nm( 'picks' ).filter( i => i.checked && !i.disabled ).map( i => parseInt( i.id.split( '-' )[1] ) );
        }
        else {
            const checkedInput = nm( 'picks' ).find( i => i.checked );
            result = checkedInput ? ( checkedInput.id === "pickNone" ? -1 : parseInt( checkedInput.id.split( '-' )[1] ) ) : null;
        }
        clear();
        callback( result );
    }

    setCloseHandlersJS( modal.id, close, submit );

    show( modal, true, "block" );
    blurBackground();
}


/*****************TOASTER*****************/


function showToaster( message )
{
    var toaster = $('#toasterBody');
    toaster.html( message );
    toaster.show();
    setTimeout(function(){ toaster.hide(); }, 3000);
}