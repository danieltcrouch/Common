<?php $style        = empty($style)     ? "black" : $style; ?>
<?php $siteTitle    = empty($siteTitle) ? "Religion & Story" : $siteTitle; ?>
<?php $pageTitle    = empty($pageTitle) ? "Religion & Story" : $pageTitle; ?>
<?php $image        = empty($image)     ? "https://religionandstory.com/common/images/turner.jpg" : $image; ?>
<?php $description  = empty($description) ? "Religion & Story seeks to explore our ways of knowing God, first through religion and also through narrative and film. This blog offers in-depth analyses of theology, culture, and movies." : $description; ?>
<?php $keywords     = empty($keywords)  ? "religion,faith,theology,story,narrative,movie,film,cinema,culture,society,politics" : $keywords; ?>

<title><?php echo $pageTitle; ?></title>

<meta id="metaDesc" name="description"          content="<?php echo $description; ?>">
<meta id="metaKeys" name="keywords"             content="<?php echo $keywords; ?>">
<meta id="fbTitle"  property="og:title"         content="<?php echo $pageTitle; ?>">
<meta id="fbName"   property="og:site_name"     content="<?php echo $siteTitle; ?>">
<meta id="fbDesc"   property="og:description"   content="<?php echo $description; ?>">
<meta id="fbImage"  property="og:image"         content="<?php echo $image; ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<link id="linkLogo"    rel="shortcut icon" type="image/png"     href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo.png"/>
<link id="linkLogo57"  rel="apple-touch-icon" sizes="57x57"     href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo-57.png" />
<link id="linkLogo60"  rel="apple-touch-icon" sizes="60x60"     href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo-60.png" />
<link id="linkLogo72"  rel="apple-touch-icon" sizes="72x72"     href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo-72.png" />
<link id="linkLogo114" rel="apple-touch-icon" sizes="114x114"   href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo-114.png" />
<link id="linkLogo120" rel="apple-touch-icon" sizes="120x120"   href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo-120.png" />
<link id="linkLogo144" rel="apple-touch-icon" sizes="144x144"   href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo-144.png" />
<link id="linkLogo152" rel="apple-touch-icon" sizes="152x152"   href="https://religionandstory.com/common/images/logos-<?php echo $style; ?>/logo-152.png" />
<link rel="stylesheet" type="text/css" href="https://religionandstory.com/common/css/general.css"/>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://religionandstory.com/common/javascript/utility.js"></script>
<script src="https://religionandstory.com/common/javascript/gui.js"></script>
<script src="https://religionandstory.com/common/javascript/date.js"></script>
