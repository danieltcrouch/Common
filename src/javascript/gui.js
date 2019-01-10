$(document).on( "click", ".title .clickable", showInstructions );
$(document).on( "click", ".inverseButton", selectRadioButton );
//todo - what was this for? SEO?
// $(document).ready(function(){
//     $("a").click(function (event) {
//         if ( this.href.indexOf( "http://religionandstory.webutu.com/utility" ) !== -1 )
//         {
//             event.preventDefault();
//             window.location = this.href;
//         }
//     });
// });

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

function showMessage( header, message, style )
{
    var modal = $('#modal');
    $('#modalHeader').text( header );
    $('#modalBody').html( message );
    if ( style )
    {
        $('#modalBody').css( style );
    }

    modal.show();

    setCloseHandlers();
    blurBackground();
}

function showConfirm( header, message, callback, style )
{
    var modal = $('#modal');
    $('#modalHeader').text( header );
    $('#modalBody').html( message );
    if ( style )
    {
        $('#modalBody').css( style );
    }

    $('#submitButton').html( "OK" );
    $('#submitButton').css( {"width":"5em"} );
    $('#cancelButton').css( {"width":"5em"} );
    $('#cancelButton').show();
    $('#modalSubmit').show();
    modal.show();

    function close( answer )
    {
        $('#submitButton').html( "Submit" );
        $('#submitButton').css( {"width":"10em"} );
        $('#cancelButton').css( {"width":"10em"} );
        $('#cancelButton').hide();
        $('#modalSubmit').hide();
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

function showBinaryChoice( header, message, leftChoice, rightChoice, callback, style )
{
    var modal = $('#modal');
    $('#modalHeader').text( header );
    $('#modalBody').html( message );
    if ( style )
    {
        $('#modalBody').css( style );
    }

    $('#submitButton').html( leftChoice );
    $('#cancelButton').html( rightChoice );
    $('#cancelButton').show();
    $('#modalSubmit').show();
    modal.show();

    function close( answer )
    {
        $('#submitButton').html( "Submit" );
        $('#cancelButton').html( "Cancel" );
        $('#cancelButton').hide();
        $('#modalSubmit').hide();
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

function showBigPrompt( header, message, callback, value, clearAfterward, style )
{
    var modal = $('#modal');
    $('#modalHeader').text( header );
    $('#modalBody').html( message );
    $('#bigPrompt').val( value );

    if ( style )
    {
        $('#modalBody').css( style );
    }

    $('#modalPrompt').show();
    $('#modalSubmit').show();
    $('#bigPrompt').show();
    $('#prompt').hide();
    modal.show();
    $('#bigPrompt').focus();

    function clear()
    {
        $('#modalPrompt').hide();
        $('#modalSubmit').hide();
        $('#bigPrompt').hide();
        $('#prompt').show();
        closeModal();

        var value = $('#bigPrompt').val();
        if ( clearAfterward )
        {
            $('#bigPrompt').val( "" );
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

function showPrompt( header, message, callback, placeholder, clearAfterward, style )
{
    var modal = $('#modal');
    $('#modalHeader').text( header );
    $('#modalBody').html( message );
    $('#prompt').attr( "placeholder", placeholder );

    if ( style )
    {
        $('#modalBody').css( style );
    }

    $('#modalPrompt').show();
    $('#modalSubmit').show();
    modal.show();
    $('#prompt').focus();

    function clear()
    {
        $('#modalPrompt').hide();
        $('#modalSubmit').hide();
        closeModal();

        var value = $('#prompt').val();
        if ( clearAfterward )
        {
            $('#prompt').val( "" );
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

function showToaster( message )
{
    var toaster = $('#toasterBody');
    toaster.html( message );
    toaster.show();
    setTimeout(function(){ toaster.hide(); }, 3000);
}