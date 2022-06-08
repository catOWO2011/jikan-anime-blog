<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
        <link rel="stylesheet" href="css/styles.css">
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/underscore@1.13.4/underscore-umd-min.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
         <!-- We use module since we make and export and import -->
        <script type="module" src="js/api-client.js"></script>
        <script type="module" src="js/utils.js"></script>
        <script type="module" src="js/app.js"></script>
    </head>
    <body>
      <header>
        <div class="menu-body" style="background-image:linear-gradient(116deg, #007affab, rgb(34 161 243 / 47%)), url(https://images8.alphacoders.com/401/thumb-1920-401843.jpg);">
          <div class="menu">
          </div>
          <div class="more-pupular-anime">
            More popular
          </div>
        </div>
      </header>
      <!-- main container -->
      <div id="my-anime-list-body">
        <div class="left-column">
          <div class="swiper-list-seasons-now">
          </div>
        </div>
        <div class="right-column">

        </div>
      </div>
    </body>
</html>