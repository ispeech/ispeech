angular.module('ispeech', ['ui.router'])

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

.config(function ($stateProvider, $urlRouterProvider) {
    // 預設路徑
    $urlRouterProvider.otherwise("/");

    // 狀態設定
    $stateProvider

    // index
    .state('index', {
        url: "/",
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
                templateUrl: "/app/templates/body.html",
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
                controller: function (websiteCopyWriting) {
                    var self = this;
                    self.items = websiteCopyWriting.footer;
                },
                controllerAs: "footer"
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
});