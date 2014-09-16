
<div ng-controller="footer as footer" class="footer">
  <div class="container">
    <div class="clearfix">
      <dl ng-repeat="(key, item) in footer.items" class="footer-nav">
        <dt class="nav-title">{{item.title}}</dt>
        <dd class="nav-item">
          <p>{{item.content}}</p>
        </dd>
      </dl>
    </div>
    <div class="footer-copyright text-center">Copyright &copy; 2014 CreatePower.<span>All Rights Reserved.</span></div>
  </div>
</div>