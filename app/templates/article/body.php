
<div class="profile"><img id="coverPhoto" src="{{body.article.coverPhoto}}" class="img-responsive"/>
  <div class="mark">
    <div class="author-title"><img src="{{body.article.lecturer.photo}}" class="author-img"/><span>{{body.article.title}}</span>
    </div>
    <div ng-show="body.article.tags" class="tagSection"><span ng-repeat="(key, tag) in body.article.tags" class="tags">{{tag}}</span></div>
  </div>
</div>
<div class="XDD"></div>
<div class="film">
  <div id="player2" ng-show="body.article.video" ng-bind-html="body.article.video" class="video-container"></div>
</div>
<div class="section">
  <div>
    <div id="player1" ng-show="!!body.article.video" ng-bind-html="body.article.video" class="video-container"></div>
  </div>
  <tabset id="myTab" class="nav nav-tabs">
    <tab heading="中文稿" ng-show="body.article.speech.chinese" ng-style="body.tabWidth">
      <div ng-bind-html="body.article.speech.chinese" class="content"></div>
    </tab>
    <tab heading="中英文對照" ng-show="body.article.speech.mix" ng-style="body.tabWidth">
      <div ng-bind-html="body.article.speech.mix" class="content"></div>
    </tab>
    <tab heading="英文稿" ng-show="body.article.speech.english" ng-style="body.tabWidth">
      <div ng-bind-html="body.article.speech.english" class="content"></div>
    </tab>
  </tabset>
  <div class="social-plugin"><!-- JiaThis Button BEGIN --><!-- JiaThis Button END -->
    <div data-app="share_buttons" data-app-id="7841807" class="shareaholic-canvas"></div>
  </div>
  <div style="padding: 15px;background: #fff;">
    <div id="disqus_thread" class="disqus_thread"></div>
  </div>
  <script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'httpispeechnet'; // required: replace example with your forum shortname
    
    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  </script>
  <noscript>Please enable JavaScript to view the<a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
<div class="section">
  <div class="similar">
    <div class="similar-title">= 你可能有興趣的其他演講 =</div>
    <div class="archive-container">
      <div ng-repeat="(key, relation) in body.relations" class="thumb">
        <div class="ribbon-wrapper">
          <div class="ribbon">精選演講</div>
        </div>
        <div class="thumb-image"><a href="/article.php?id={{relation.id}}" id="{{relation.id}}" ng-click="body.ga_image_a();"><img src="{{relation.coverPhoto}}"/></a>
        </div>
        <div class="thumb-info">
          <div class="thumb-title">
            <div class="thumb-name">
              <h2><a href="/article.php?id={{relation.id}}">{{relation.title}}</a>
                <p style="color: #9B9B9B;line-height: 16px;">{{relation.abstract}}</p>
              </h2>
            </div>
            <div class="thumb-cat"></div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</div>