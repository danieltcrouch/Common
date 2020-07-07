<?php
include_once("common-service.php");

function validateUser( $app, $authToken )
{
    return httpCall( "https://oauth2.googleapis.com/tokeninfo", ['id_token' => $authToken] );
}

/*** CONTROLLER ***/

if ( isset($_POST['action']) && function_exists( $_POST['action'] ) ) {
    $action = $_POST['action'];
    $result = null;

    try {
        if ( isset($_POST['appName']) && isset($_POST['authToken']) ) {
            $result = $action( $_POST['appName'], $_POST['authToken'] );
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