

var messageDelay = 2000;

// Init the form once the document is ready
$( init );


// Initialize the form

function init() {

    // Hide the form initially.
    // Make submitForm() the form’s submit handler.
    // Position the form so it sits in the centre of the browser window.
    $('#registrationForm').hide().submit(submitForm).addClass( 'positioned' );

    // When the "Send us an email" link is clicked:
    // 1. Fade the content out
    // 2. Display the form
    // 3. Move focus to the first field
    // 4. Prevent the link being followed
    
    $('a[href="#registrationForm"]').click( function() {
        $('#main-content').fadeTo( 'slow', .2 );
        $('#logo-container').fadeTo('slow', .2);
        // $('#registrationForm').fadeIn('slow');
        $('#registrationForm').fadeIn( 'slow', function() {
            $('#userName').focus();
        } )
        return false;
    } );
    
    // When the "Cancel" button is clicked, close the form
    $('#cancel').click( function() { 
        $('#registrationForm').fadeOut();
        $('#main-content').fadeTo( 'slow', 1 );
        $('#logo-container').fadeTo('slow', 1);
    } );
    
    // When the "Escape" key is pressed, close the form
    $('#registrationForm').keydown( function( event ) {
        if ( event.which == 27 ) {
            $('#registrationForm').fadeOut();
            $('#main-content').fadeTo( 'slow', 1 );
            $('#logo-container').fadeTo('slow', 1);
        }
    } );
    
}

function submitForm() {
    var contactForm = $(this);
    
    // Are all the fields filled in?
    
    if ( !$('#userName').val() || !$('#userEmail').val()) {
        
        // No; display a warning message and return to the form
        $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
        contactForm.fadeOut().delay(messageDelay).fadeIn();
        
    } else {
        
        // Yes; submit the form to the PHP script via Ajax
        $('#sendingMessage').fadeIn();
        contactForm.fadeOut();
        $.ajax( {
            url: contactForm.attr( 'action' ) + "?ajax=true",
            type: contactForm.attr( 'method' ),
            data: contactForm.serialize(),
            success: submitFinished
        } );
    }
    
    // Prevent the default form submission occurring
    return false;
}