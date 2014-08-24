<!DOCTYPE html>
<html>

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?=$this->title?></title>

    	<meta name="viewport" coantent="width=device-width; initial-scale=1.0" />
        <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
        <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" href="../bower_components/flat-ui-official/css/flat-ui.css">
        <link rel="stylesheet" href="http://bchanx.com/static/compiled/demo-slidr.css">

        <link rel="stylesheet" href="http://www.littleco.com/wp-content/themes/littlecompany/css/bootstrap-responsive.css">
        <link rel="stylesheet" href="http://www.littleco.com/wp-content/themes/littlecompany/css/main.css?ver=20130926">
    	<link rel="stylesheet" href="http://www.littleco.com/wp-content/themes/littlecompany/css/font-awesome.css">
        <link rel="stylesheet" href="../static/css/main.css">

    </head>

    <body>

        <div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/zh_TW/all.js#xfbml=1&appId=582221601854005";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        </script>

        <?=$this->content?>

        <!--load dependency script-->
        <script src="../bower_components/jquery/dist/jquery.js"></script>
        <script src="../bower_components/slidr/slidr.min.js"></script>
        <script src="../bower_components/jquery-waypoints/waypoints.min.js"></script>
        <script src="../bower_components/jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js"></script>
        <script src="http://www.littleco.com/wp-content/themes/littlecompany/js/bootstrap.min.js?ver=20130926"></script>
    	<script src="http://www.littleco.com/wp-content/themes/littlecompany/js/jquery.validity.min.js?ver=20130926"></script>

        <!--load script-->
        <script src="../static/js/ispeech.js"></script>
        <!--script src="../static/js/main.js"></script-->
        <?=$this->javascript?>

    </body>

</html>

