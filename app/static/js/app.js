angular.module('ispeech', ['ui.router', 'facebook', 'ui.bootstrap', 'ngSanitize'])


// *************************************
//
//   Project partial
//   -> Constant & value
//
// *************************************


.value('websiteCopyWriting',{
    footer: [{
        title: "關於我們",
        content: "一群熱血愛做夢的孩子，走在人生的路上總是會迷惘，透過演講的力量，讓我們成長、改變。"
    },{
        title: "創立宗旨",
        content: "我們都曾因為聽了某些名人或素人的演講，而開始改變了自己的想法與目標。此刻，希望能讓更多人在這平台上找到屬於你的方向，思考人生。"
    },{
        title: "隱私權",
        content: "本站演講禁止轉載。"
    },{
        title: "聯絡我們",
        content: "有任何問題都歡迎與我們聊聊！"
    }]
})

.value('API', {
    SERVER: 'http://api.i-speech.net/speechapi/',

    getTag: 'article/',
    getList: 'article_list/',
    postSearch: 'article/',

    getArticle: 'article/',
    postRecord: 'article/',

    getUserInfo: 'article/',
    getPastCollectArticle: 'article/',

    postCollect: 'article/',

    postLogin: 'member_login/',
    postRigister: 'article/'
})


// *************************************
//
//   Project partial
//   -> Config & run
//
// *************************************


.config(function ($stateProvider, $urlRouterProvider, FacebookProvider) {

    FacebookProvider.init('582221601854005');

    // 預設路徑
    $urlRouterProvider.otherwise("/");

    // 狀態設定
    $stateProvider

    // index
    .state('list', {
        url: "/",
        // resolve: {
        //     categories: function (articleService) {
        //         return articleService.getCategories();
        //     }
        // },
        views: {
            "header": {
                templateUrl: "/app/templates/header.html",
                controller: "ISPEECH.controller.header as header"
            },

            "body": {
                templateUrl: "/app/templates/list/body.html",
                controller: function ($scope, AJAX, $http) {
                    var self = this;

                    // AJAX.list.getTag({

                    // },function(res){
                    //     self.tags = res;
                    // },function(res){

                    // })

                    AJAX.list.getList({

                    },function(res){
                        ISPEECH.midware.getListMapping(res);
                        self.list = ISPEECH.midware.getList; // fake data
                    },function(res){
                        // addAlert()
                    })

                    self.search = function () {
                        AJAX.list.postSearch({

                        },function(res){
                            self.tags = res;
                        })
                    }


                    // pagination model
                    // $scope.totalItems = 10;//self.list.length;

                    $itemPage = 9;
                    // $scope.currentPage = 4;
                    $scope.maxSize = 5; // 最多顯示頁數
                    $scope.bigTotalItems = 175;
                    $scope.bigCurrentPage = 1;


                    // $scope.setPage = function (pageNo) {
                    //     $scope.currentPage = pageNo;
                    // };

                    $scope.pageChanged = function() {
                        console.log('Page changed to: ' + $scope.currentPage);
                    };

                    // Carousel
                    $scope.myInterval = 5000;
                    var slides = $scope.slides = [];

                    $scope.addSlide = function() {
                        var newWidth = 600 + slides.length;
                        slides.push({
                          image: 'http://www.picturesnew.com/media/images/image-background.jpg',
                          text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                        });
                    };

                    for (var i=0; i<4; i++) {
                        $scope.addSlide();
                    }

                    // Typeahead
                    $scope.selected = undefined;
                    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
                    // Any function returning a promise object can be used to load values asynchronously
                    $scope.getLocation = function(val) {
                        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                          params: {
                            address: val,
                            sensor: false
                          }
                        }).then(function(res){
                          var addresses = [];
                          angular.forEach(res.data.results, function(item){
                            addresses.push(item.formatted_address);
                          });
                          return addresses;
                        });
                    };

                    $scope.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];

                },
                controllerAs: "body"
            },

            "footer": {
                templateUrl: "/app/templates/footer.html",
                controller: "ISPEECH.controller.footer as footer"
            }
            // ,
            // "navbar": {
            //     templateUrl: "/app/templates/navbar.html",
            // }

        }
    })


    // article
    .state('article', {
        url: "/article/:articleId",
        // resolve: {
        //     categories: function (articleService) {
        //         return articleService.getCategories();
        //     }
        // },
        views: {
            "header": {
                templateUrl: "/app/templates/header.html",
                controller: "ISPEECH.controller.header as header"
            },

            "body": {
                templateUrl: "/app/templates/article/body.html",
                controller: function ($state, $scope, $stateParams, $sce, AJAX) {
                    var self = this;
                    AJAX.article.getArticle({
                        id: $stateParams.articleId
                    },function(res){
                        ISPEECH.midware.getArticleMapping(res);

                        self.article = ISPEECH.midware.getArticle; // fake data
                        // 會造成 TypeError: undefined is not a function at htmlParser 有空再修。
                        self.article.video = $sce.trustAsHtml(ISPEECH.midware.getArticle.video);
                        self.relations = ISPEECH.midware.getArticle.relations;
                        // 控制 Tab 的寬度
                        self.speechNum = 0;
                        angular.forEach(self.article.speech, function(value, key) {
                            if(value !== '') self.speechNum+=1;
                        });
                        self.tabWidth = {'width': (100/self.speechNum) +'%'};
                        // angular.element('meta[property="og:title"]').attr('content', ISPEECH.midware.getArticle.title);
                        // angular.element('meta[property="og:image"]').attr('content', ISPEECH.midware.getArticle.coverPhoto);
                        // angular.element('meta[property="og:description"]').attr('content', ISPEECH.midware.getArticle.abstract);

                    },function(res){
                        // $state.go('list');
                    })

                    self.reload = function(){
                        console.log('reload')
                    }

                    // self.article = ISPEECH.midware.getArticle;
                    // self.article.video = $sce.trustAsHtml(ISPEECH.midware.getArticle.video);
                    // self.relations = ISPEECH.midware.getArticle.relations;
                    // // 控制 Tab 的寬度
                    // self.speechNum = 0;
                    // angular.forEach(self.article.speech, function(value, key) {
                    //     if(value !== '') self.speechNum+=1;
                    // });
                    // self.tabWidth = {'width': (100/self.speechNum) +'%'};


                    // self.record = function () {
                    //     AJAX.article.postRecord({

                    //     },function(res){
                    //         self.tags = res;
                    //     })
                    // }


                    // $scope.tabs = [
                    //     { title:'Dynamic Title 1', content:'Dynamic content 1' },
                    //     { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
                    // ];

                    // $scope.alertMe = function() {
                    // setTimeout(function() {
                    //   alert('You\'ve selected the alert tab!');
                    // });
                    // };




                },
                controllerAs: "body"
            },

            "footer": {
                templateUrl: "/app/templates/footer.html",
                controller: "ISPEECH.controller.footer as footer"
            }

            // ,
            // "navbar": {
            //     templateUrl: "/app/templates/navbar.html",
            // }

        }
    })

    .state('account', {
        url: "/account",
        // resolve: {
        //     categories: function (articleService) {
        //         return articleService.getCategories();
        //     }
        // },
        views: {
            "header": {
                templateUrl: "/app/templates/header.html",
                controller: "ISPEECH.controller.header as header"
            },
            "body": {
                templateUrl: "/app/templates/account/body.html",
                controller: function ($http, $state, categories) {
                    $state.go('article.category', {categoryId: categories[0].id});
                    $http({
                        method: "get",
                        url: "http://api.i-speech.net/speechapi/article/",
                        params: {}
                    })
                    .success(function(res){
                        console.log(res)
                    })
                    .error(function(res){
                        console.log(res)
                    })
                }
            },
            "footer": {
                templateUrl: "/app/templates/footer.html",
                controller: "ISPEECH.controller.footer as footer"
            }
        }
    })

    // .state('login', {
    //     url: "/login",
    //     // resolve: {
    //     //     categories: function (articleService) {
    //     //         return articleService.getCategories();
    //     //     }
    //     // },
    //     views: {
    //         "body": {
    //             templateUrl: "/app/templates/other/login.html",
    //             controller: function ($scope, $http, $state, Facebook) {

    //             },
    //             controllerAs: "header"
    //         }
    //     }
    // })

})

.run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.resolve) {
            // blockUI.start();
        }
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (toState.resolve) {
            // blockUI.stop();
        }
    });
})


// *************************************
//
//   Project partial
//   -> Controller
//
// *************************************


// .controller('authenticationCtrl', function($scope, Facebook) {

//     $scope.login = function() {
//       // From now on you can use the Facebook service just as Facebook api says
//       Facebook.login(function(response) {
//         // Do something with response.
//       });
//     };

//     $scope.getLoginStatus = function() {
//       Facebook.getLoginStatus(function(response) {
//         if(response.status === 'connected') {
//           $scope.loggedIn = true;
//         } else {
//           $scope.loggedIn = false;
//         }
//       });
//     };

//     $scope.me = function() {
//       Facebook.api('/me', function(response) {
//         $scope.user = response;
//       });
//     };
// })

// .controller('headCtrl', function($scope, Facebook) {

//     $scope.head = function() {
//       // From now on you can use the Facebook service just as Facebook api says
//       Facebook.login(function(response) {
//         // Do something with response.
//       });
//     };

// })


// *************************************
//
//   Project partial
//   -> Service
//
// *************************************


.factory('AJAX', ISPEECH.service.AJAX)
.factory('alert', ['', function(){
    // $scope.alerts = [
    //     { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    //     { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    // ];

    return {
        addAlert: function() {
            // $scope.alerts.push({type: 'success', msg: 'Another alert!'});
        },

        closeAlert: function(index) {
            // $scope.alerts.splice(index, 1);
        }
    };
}])