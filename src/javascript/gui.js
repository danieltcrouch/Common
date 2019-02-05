$(document).on( "click", ".title .clickable", showInstructions );
$(document).on( "click", ".inverseButton", selectRadioButton );


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


function selectTab( e )
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

function deselectAllTabs( groupName )
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

function getSelectedTab( groupName )
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


/******************MODAL******************/


function blurBackground()
{
    $('body').addClass( "blur" );
}

function closeModal()
{
    $('body').removeClass( "blur" );
    $('#modal').hide();
}

function setCloseHandlers( close, submit, overwriteClose )
{
    close = close || closeModal;
    submit = submit || close;

    var modal = $('#modal');
    modal.find('#cancelButton').off( "click" );
    modal.find('#submitButton').off( "click" );
    modal.find('#cancelButton').click( close );
    modal.find('#submitButton').click( submit );

    modal.find('#prompt').off( "keyup" );
    modal.find('#prompt').keyup( function(e) {
        if ( e.keyCode === 13 ) {
            submit();
        }
    });

    close = overwriteClose ? closeModal : close;
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

    setCloseHandlers();
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
        closeModal();
        callback( answer === true );
    }

    function confirm()
    {
        close( true );
    }

    setCloseHandlers( close, confirm );
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

    modal.find('#leftButton').html( leftChoice );
    modal.find('#rightButton').html( rightChoice );
    modal.show();

    function close( answer )
    {
        closeModal();
        callback( answer === true );
    }

    function confirm()
    {
        close( true ); //returns TRUE for clicking Left Choice
    }

    setCloseHandlers( close, confirm, true );
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
        closeModal();

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

    setCloseHandlers( close, submit );
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
        closeModal();

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

    setCloseHandlers( close, submit );
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