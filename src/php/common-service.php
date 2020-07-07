<?php

/*** HTTP CALL ***/
function httpCall( $baseUrl, $params )
{
    $result = null;

    try {
        $paramString = http_build_query( $params, "", "&", PHP_QUERY_RFC3986 );
        $url = "$baseUrl?$paramString";
        $result = json_decode( file_get_contents( $url ) );
    }
    catch ( Exception $e ) {
        echo "Error: " . $e->getMessage();
    }

    return $result;
}

/*** EMAIL ***/
function sendEmail( $addressList, $subject, $message )
{
    //possibly use global variables from startup.php
//    $to = "danieltcrouch@gmail.com";
//    $message = wordwrap($message, 70);
//    $headers = "MIME-Version: 1.0\r\n";
//    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
//    $headers .= "From: ReligionAndStory<noreply@religionandstory.com>\r\n" .
//                "Bcc: " . implode( ',', $addressList );
//    return mail($to, $subject, $message, $headers);
}

/*** OTHER ***/
function getJsonRequest()
{
	return json_decode( file_get_contents("php://input") );
}

function getGUID()
{
	mt_srand((double)microtime()*10000);
	return strtoupper(md5(uniqid(rand(), true)));
}

function getNullValue( $value )
{
	return $value ? $value : null;
}

?>