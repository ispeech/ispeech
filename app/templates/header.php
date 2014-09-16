
<header role="navigation" ng-controller="header as header" class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid"><a href="/" class="logo">Is</a>
    <button type="button" class="navbar-toggle open_nav"></button>
    <p class="slogan_mobile only_mobile">愛聽講</p>
    <div id="bs-example-navbar-collapse-5" class="collapse navbar-collapse">
      <p class="slogan">多看多聽不一樣的經驗分享，將改變你的態度與人生</p>
    </div>
    <button ng-hide="header.user" type="button" ng-click="header.login()" class="btn btn-primary navbar-right advanced_btn">登入使用</button>
    <div class="header-profile"><img ng-click="header.account()" ng-show="header.user" src="{{header.user.picture.data.url}}" alt=""/></div>
  </div>
</header>