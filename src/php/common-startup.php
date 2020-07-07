<?php

function getRootPath()
{
    $public = "public_html";
    $path = $_SERVER['DOCUMENT_ROOT'];
    $length = strpos( $path, $public ) + strlen( $public );
    return substr( $path, 0, $length ) . "/";
}

function getAppCode()
{
    global $appCode;
    return $appCode;
}

function getSubPath()
{
    return getRootPath() . getAppCode() . "/";
}

function getCommonPath()
{
    return getRootPath() . "common/";
}

function includeHeadInfo()
{
    global $siteTitle;
    global $pageTitle;
    global $image;
    global $description;
    global $keywords;
    include_once(getCommonPath() . "html/head.php");
    include_once(getCommonPath() . "html/signin.html");
}

function includeHeader()
{
    global $homeUrl;
    include_once(getCommonPath() . "html/header.php");
}

function includeModals()
{
    include_once(getCommonPath() . "html/modal.html");
    include_once(getCommonPath() . "html/modal-choice.html");
    include_once(getCommonPath() . "html/modal-pick.html");
    include_once(getCommonPath() . "html/modal-prompt.html");
    include_once(getCommonPath() . "html/modal-prompt-big.html");
    include_once(getCommonPath() . "html/toaster.html");
}

function getHelpImage()
{
    echo "https://religionandstory.com/common/images/question-mark.png";
}

function getConstructionImage()
{
    echo "https://image.freepik.com/free-icon/traffic-cone-signal-tool-for-traffic_318-62079.jpg";
}

?>