<?php

function validateUser( $app, $authToken, $createNew )
{
    return httpCall( "https://oauth2.googleapis.com/tokeninfo", ['id_token' => $authToken] );
}

/*** CONTROLLER ***/

if ( isset($_POST['action']) && function_exists( $_POST['action'] ) ) {
    $action = $_POST['action'];
    $result = null;

    try {
        if ( isset($_POST['appName']) && isset($_POST['authToken']) && isset($_POST['createNew']) ) {
            $result = $action( $_POST['appName'], $_POST['authToken'], $_POST['createNew'] );
        }
        else {
            $result = $action();
        }

        echo json_encode($result);
    }
    catch ( PDOException $e ) {
        echo "Error: " . $e->getMessage();
    }
}

?>