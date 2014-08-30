angular.module('ispeech', ['ui.router', 'facebook', 'ui.bootstrap', 'ngSanitize'])

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
    getList: 'article/',
    postSearch: 'article/',

    getArticle: 'article/',
    postRecord: 'article/',

    getUserInfo: 'article/',
    getPastCollectArticle: 'article/',

    postCollect: 'article/',

    postLogin: 'article/',
    postRigister: 'article/'
})

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
                controller: function (AJAX) {
                    var self = this;
                    AJAX.list.getTag({

                    },function(res){
                        self.tags = res;
                    },function(res){

                    })

                    AJAX.list.getList({

                    },function(res){
                        self.list = res;
                    },function(res){
                        addAlert()
                    })

                    self.search = function () {
                        AJAX.list.postSearch({

                        },function(res){
                            self.tags = res;
                        })
                    }

                },
                controllerAs: "body"
            },

            "footer": {
                templateUrl: "/app/templates/footer.html",
                controller: "ISPEECH.controller.footer as footer"
            },

            "navbar": {
                templateUrl: "/app/templates/navbar.html",
            }

        }
    })

        // .state('list.item', {
        //     url: 'a',

        //     views: {
        //         "item": {
        //             templateUrl: "/app/templates/list/body.item.html"
        //         }
        //     }
        // })

        // .state('list.search', {
        //     url: 'b',

        //     views: {
        //         "search": {
        //             templateUrl: "/app/templates/list/body.search.html"
        //         }
        //     }
        // })

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
                templateUrl: "/app/templates/header.html"
            },

            "body": {
                templateUrl: "/app/templates/article/body.html",
                controller: function ($scope, AJAX) {
                    var self = this;
                    AJAX.article.getArticle({

                    },function(res){
                        ISPEECH.midware.getArticleMapping(res);
                        self.article = ISPEECH.midware.getArticle; // fake data
                    })

                    self.record = function () {
                        AJAX.article.postRecord({

                        },function(res){
                            self.tags = res;
                        })
                    }

                    $scope.myInterval = 5000;
                    var slides = $scope.slides = [];
                    $scope.addSlide = function() {
                    var newWidth = 600 + slides.length;
                    slides.push({
                        image: 'http://placekitten.com/' + newWidth + '/300',
                        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                        });
                    };
                    for (var i=0; i<4; i++) {
                        $scope.addSlide();
                    }

                },
                controllerAs: "body"
            },

            "footer": {
                templateUrl: "/app/templates/footer.html",
                controller: function (websiteCopyWriting) {
                    var self = this;
                    self.items = websiteCopyWriting.footer;
                },
                controllerAs: "footer"
            },

            "navbar": {
                templateUrl: "/app/templates/navbar.html",
            }

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
                templateUrl: "/app/templates/header.html"
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


    // // 文章
    // .state('article', {
    //     url: "/article",
    //     resolve: {
    //         categories: function (articleService) {
    //             return articleService.getCategories();
    //         }
    //     },
    //     views: {
    //         "header": {
    //             templateUrl: "template/shared/header.html"
    //         },
    //         "mainContent": {
    //             template: "<div ui-view></div>",
    //             controller: function ($state, categories) {
    //                 $state.go('article.category', {categoryId: categories[0].id});
    //             }
    //         }
    //     }
    // })
    // // 文章分類
    // .state('article.category', {
    //     url: "/category/:categoryId",
    //     resolve: {
    //         articles: function ($stateParams, articleService) {
    //             return articleService.getArticlesByCategoryId($stateParams.categoryId);
    //         }
    //     },
    //     templateUrl: "template/article/category.html",
    //     controller: 'categoryController',
    //     controllerAs: 'categoryCtrl'
    // })
    // // 文章內容
    // .state('article.category.detail', {
    //     url: "/article/:articleId",
    //     templateUrl: 'template/article/article.html',
    //     controller: 'articleController',
    //     controllerAs: 'articleCtrl'
    // })
    // // 相簿
    // .state('album', {
    //     url: "/album",
    //     resolve: {
    //         albums: function (albumService) {
    //             return albumService.getAlbums();
    //         }
    //     },
    //     views: {
    //         "header": {
    //             templateUrl: "template/shared/header.html"
    //         },
    //         "mainContent": {
    //             template: "<div ui-view></div>",
    //             controller: function ($state, albums) {
    //                 $state.go('album.photo', {albumId: albums[0].id});
    //             }
    //         }
    //     }
    // })
    // // 相簿內容
    // .state('album.photo', {
    //     url: "/:albumId",
    //     resolve: {
    //         photos: function ($stateParams, albumService) {
    //             return albumService.getPhotosByAlbumId($stateParams.albumId);
    //         }
    //     },
    //     templateUrl: "template/album/album.html",
    //     controller: 'albumController',
    //     controllerAs: 'albumCtrl'
    // })
    // // 影片
    // .state('video', {
    //     url: "/video",
    //     resolve: {
    //         videoGroups: function (videoService) {
    //             return videoService.getVideoGroups();
    //         }
    //     },
    //     views: {
    //         "header": {
    //             templateUrl: "template/shared/header.html"
    //         },
    //         "mainContent": {
    //             template: "<div ui-view></div>",
    //             controller: function ($state, videoGroups) {
    //                 $state.go('video.group', {videoGroupId: videoGroups[0].id});
    //             }
    //         }
    //     }
    // })

    // // 影片群組
    // .state('video.group', {
    //     url: "/group/:videoGroupId",
    //     resolve: {
    //         videos: function ($stateParams, videoService) {
    //             return videoService.getVideosByGroupId($stateParams.videoGroupId);
    //         }
    //     },
    //     templateUrl: "template/video/videoGroup.html",
    //     controller: 'videoGroupController',
    //     controllerAs: 'videoGroupCtrl'
    // })

    // // 影片內容
    // .state('video.group.detail', {
    //     url: "/video/:videoId",
    //     templateUrl: 'template/video/video.html',
    //     controller: 'videoController',
    //     controllerAs: 'videoCtrl'
    // });
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