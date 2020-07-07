<?php
include_once("common-service.php");

function readLocalFile( $fileName )
{
    return file( $fileName );
}

if ( isset($_POST['action']) && function_exists( $_POST['action'] ) ) {
    $action = $_POST['action'];
    $result = null;

    try {
        if ( isset($_POST['fileName']) ) {
            $result = $action( $_POST['fileName'] );
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