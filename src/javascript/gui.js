$(document).on( "click", ".title .clickable", showInstructions );
$(document).on( "click", ".inverseButton", selectRadioButton );
$(document).on( "click", ".inverseTab", selectTabButton );


/*****************DISPLAY*****************/


function showInstructions( e )
{
    showMessage( "Instructions", $('#instructions').html() );
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


/******************RADIO******************/


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
        if ( button.classList.contains( "selectedButton" ) )
        {
            result = button;
        }
    });
    return result;
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

function setTabCallback( groupName, callback )
{
    $(document).on( "click", "button[name=" + groupName + "]", function(){callback( $(this).attr("id") );} );
}

function setTabCallbackToDisplay( groupName )
{
    setTabCallback( groupName, function( tabId ) { displayOnlyTab( tabId, groupName ); } );
}

function getTabs( groupName )
{
    var allTabs = $("div.tab");
    if ( groupName )
    {
        allTabs = allTabs.filter( "." + groupName + "Tab" );
    }
    return allTabs;
}

function displayOnlyTab( tabId, groupName )
{
    hideAllTabs( groupName );
    $( "div#" + tabId + ".tab" ).show();
}

function hideAllTabs( groupName )
{
    var allTabs = getTabs( groupName );
    allTabs.hide();
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

function setCloseHandlers( modal, close, submit, overwriteClose, leftButton, rightButton )
{
    var defaultClose = function() { closeModal( modal ) };
    close = close || defaultClose;
    submit = submit || close;

    leftButton = leftButton || modal.find('#submitButton');
    leftButton.off( "click" );
    leftButton.click( submit );
    rightButton = rightButton || modal.find('#cancelButton');
    rightButton.off( "click" );
    rightButton.click( close );

    var prompt = modal.find('#prompt');
    if ( prompt && prompt.is( "input" ) )
    {
        modal.find('#prompt').off( "keyup" );
        modal.find('#prompt').keyup( function(e) {
            if ( e.keyCode === 13 ) {
                submit();
            }
        });
    }

    close = overwriteClose ? defaultClose : close;
    modal.find('.close').off( "click" );
    modal.find('.close').click( close );

    $(window).off( "click" );
    $(window).click(function(e) {
        if ( e.target.id === modal.attr("id") ) {
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

    function close( answer )
    {
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


/*****************TOASTER*****************/


function showToaster( message )
{
    var toaster = $('#toasterBody');
    toaster.html( message );
    toaster.show();
    setTimeout(function(){ toaster.hide(); }, 3000);
}