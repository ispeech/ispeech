
<carousel interval="myInterval">
  <slide ng-repeat="slide in slides" active="slide.active"><img ng-src="{{slide.image}}" style="margin:auto;width: 100%;" class="img-responsive slidesPhoto"/>
    <div class="carousel-caption">
      <h4>Slide {{$index}}</h4>
      <p>{{slide.text}}</p>
    </div>
  </slide>
</carousel>
<div class="container container-top">
  <div class="row">
    <div class="col-md-12">
      <div class="search-bar fa fa-search">
        <input type="text" ng-model="asyncSelected" placeholder="請輸入你想查詢的公開演講" typeahead="address for address in getLocation($viewValue)" typeahead-loading="loadingLocations" class="form-control"/>
        <div class="tag"><a href="#" ng-repeat="(key, tag) in body.tags">{{tag.tw_title}}</a></div>
      </div>
    </div>
  </div>
  <div class="row">
    <div ng-show="true" ng-repeat="(key, item) in body.list" style="padding:10px;" class="col-sm-6 col-md-4">
      <div id="{{index}}" class="thumbnail">
        <div class="ribbon-wrapper">
          <div class="ribbon">近期演講</div>
        </div><a href="/article.php?id={{item.id}}"><img src="{{item.coverPhoto}}" onerror="this.src = ISPEECH.constant.ERROR_IMAGE"/></a>
        <div class="caption">
          <h1>{{item.title}} {{item.name}}</h1>
          <div class="description">
            <p>{{item.abstract}}</p>
          </div>
          <div class="keyword">
            <div class="tag_style_2"><a href="#">太陽花</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div style="text-align:center;" class="col-md-12">
      <pagination total-items="bigTotalItems" ng-model="bigCurrentPage" max-size="maxSize" boundary-links="true" rotate="false" num-pages="numPages" previous-text="‹" next-text="›" first-text="«" last-text="»" class="pagination-sm"></pagination>
    </div>
  </div>
</div>