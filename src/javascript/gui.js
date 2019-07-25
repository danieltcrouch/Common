$(document).on( "click", "#helpIcon", showInstructions );
$(document).on( "click", ".inverseButton", selectRadioButton );
$(document).on( "click", ".inverseTab", selectTabButton );


/*****************DISPLAY*****************/


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


function chooseRadioButton( buttonId )
{
    id(buttonId).click();
}

function selectRadioButton( e )
{
	var clickedButton = e.target;
	var groupName = clickedButton.attributes["name"].value;
	var allButtons = $('button[name=' + groupName + ']').toArray();
    allButtons.forEach( function( button ) {
        if ( button.id === clickedButton.id )
        {
            button.classList.add( "selectedButton" );
            button.classList.remove( "inverseButton" );
        }
        else
        {
            button.classList.add( "inverseButton" );
            button.classList.remove( "selectedButton" );
        }
    });
}

function unfreezeRadioButtons( groupName, buttonIds )
{
    freezeRadioButtons( groupName, buttonIds, false )
}

function freezeRadioButtons( groupName, buttonIds, makeStatic = true )
{
    var allButtons = ( groupName ) ? $('button[name=' + groupName + ']').toArray() :
                     ( buttonIds ) ? buttonIds.map( buttonId => id( buttonId ) ) : [];
    allButtons.forEach( function( button ) {
        const isSelected = button.classList.contains( "selectedButton" ) || button.classList.contains( "staticSelectedButton" );
        button.classList.remove( "selectedButton" );
        button.classList.remove( "inverseButton" );
        button.classList.remove( "staticSelectedButton" );
        button.classList.remove( "staticInverseButton" );
        var classToAdd = makeStatic ?
            (isSelected ? "staticSelectedButton" : "staticInverseButton") :
            (isSelected ? "selectedButton" : "inverseButton");
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

function closeModal( modal )
{
    $('body').removeClass( "blur" );
    modal.hide();
}

function setCloseHandlers( modal, cancel, submit, normalCloseWithX, leftButton, rightButton )
{
    var defaultClose = function() { closeModal( modal ) };
    cancel = cancel || defaultClose;
    submit = submit || cancel;

    leftButton = leftButton || modal.find('#submitButton');
    leftButton.off( "click" );
    leftButton.click( submit );
    rightButton = rightButton || modal.find('#cancelButton');
    rightButton.off( "click" );
    rightButton.click( cancel );

    var prompt = modal.find('#prompt');
    if ( prompt && prompt.is( "input" ) )
    {
        modal.find('#prompt').off( "keyup" );
        modal.find('#prompt').keyup( function(e) {
            if ( e.keyCode === 13 || e.which === 13 ) {
                submit();
            }
        });
    }

    var close = normalCloseWithX ? defaultClose : cancel;
    modal.find('.close').off( "click" ); //Close (X) Button
    modal.find('.close').click( close );

    $(window).off( "click" );
    $(window).click(function(e) {
        if ( e.target.parentNode.id === modal.attr("id") ) {
            close();
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

function showBinaryChoice( headerText, message, leftChoice, rightChoice, callback, style )
{
    var modal = $('#binaryModal');
    var header = modal.find('#modalHeader');
    var body = modal.find('#modalBody');

    header.text( headerText );
    body.html( message );
    if ( style )
    {
        body.css( style );
    }

    var leftButton = modal.find('#leftButton');
    var rightButton = modal.find('#rightButton');
    leftButton.html( leftChoice );
    rightButton.html( rightChoice );
    modal.show();

    function close( answer )
    {
        closeModal( modal );
        callback( answer === true );
    }

    function confirm()
    {
        close( true ); //returns TRUE for clicking Left Choice
    }

    setCloseHandlers( modal, close, confirm, true, leftButton, rightButton );
    blurBackground();
}

function showPrompt( headerText, message, callback, placeholder, clearAfterward, style )
{
    var modal = $('#promptModal');
    var header = modal.find('#modalHeader');
    var body = modal.find('#modalBody');
    var prompt = modal.find('#prompt');

    header.text( headerText );
    prompt.attr( "placeholder", placeholder );
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


/*****************TOASTER*****************/


function showToaster( message )
{
    var toaster = $('#toasterBody');
    toaster.html( message );
    toaster.show();
    setTimeout(function(){ toaster.hide(); }, 3000);
}