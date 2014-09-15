Ispeech
========

version 0.1.0

## Milestone
date| description|
---|---|
2014/8/24 | Planning document and import angular
2014/8/27 | import MVCSS
2014/9/13 | 確認文章分享準備上線
2014/9/16 | 認命還是只能用 php 開發



## Frameworks
name| description|
---|---|
angular| test project structure
angular-ui-router | deal with router
[MVCSS 4.0.3](http://mvcss.ycnets.com/)| Planning CSS coding style

## 優缺點
### 優點
* 前端使用新架構力求好維護。

### 缺點
* 前端架構無法解決把 base 抽出來，還是需要後端來組檔案結構，也就是說 doctype 那部分無法抽離在分開不同的檔案繼承。
* 每頁文章分享的 meta 標簽是否能解決

## 遇到的問題
* angular run(好像是當 injector 都注入完畢就會執行)??
* TypeError: undefined is not a function at htmlParser -> ng-bind-html 當用 iframe 會出現 error(1.1.5 會有這個問題，換了1.2.1就正常了)
* 此版本還無法完全抽離 jquery
* hash -> 換文章不會 reload
* 認命還是只能用 php 開發 ...
