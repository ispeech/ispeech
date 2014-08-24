    angular.module('kpApp')
            .config(function ($stateProvider, $urlRouterProvider) {
                // 預設路徑
                $urlRouterProvider.otherwise("/article");

                // 狀態設定
                $stateProvider
                        // 文章
                        .state('article', {
                            url: "/article",
                            resolve: {
                                categories: function (articleService) {
                                    return articleService.getCategories();
                                }
                            },
                            views: {
                                "header": {
                                    templateUrl: "template/shared/header.html"
                                },
                                "mainContent": {
                                    template: "<div ui-view></div>",
                                    controller: function ($state, categories) {
                                        $state.go('article.category', {categoryId: categories[0].id});
                                    }
                                }
                            }
                        })
                        // 文章分類
                        .state('article.category', {
                            url: "/category/:categoryId",
                            resolve: {
                                articles: function ($stateParams, articleService) {
                                    return articleService.getArticlesByCategoryId($stateParams.categoryId);
                                }
                            },
                            templateUrl: "template/article/category.html",
                            controller: 'categoryController',
                            controllerAs: 'categoryCtrl'
                        })
                        // 文章內容
                        .state('article.category.detail', {
                            url: "/article/:articleId",
                            templateUrl: 'template/article/article.html',
                            controller: 'articleController',
                            controllerAs: 'articleCtrl'
                        })
                        // 相簿
                        .state('album', {
                            url: "/album",
                            resolve: {
                                albums: function (albumService) {
                                    return albumService.getAlbums();
                                }
                            },
                            views: {
                                "header": {
                                    templateUrl: "template/shared/header.html"
                                },
                                "mainContent": {
                                    template: "<div ui-view></div>",
                                    controller: function ($state, albums) {
                                        $state.go('album.photo', {albumId: albums[0].id});
                                    }
                                }
                            }
                        })
                        // 相簿內容
                        .state('album.photo', {
                            url: "/:albumId",
                            resolve: {
                                photos: function ($stateParams, albumService) {
                                    return albumService.getPhotosByAlbumId($stateParams.albumId);
                                }
                            },
                            templateUrl: "template/album/album.html",
                            controller: 'albumController',
                            controllerAs: 'albumCtrl'
                        })
                        // 影片
                        .state('video', {
                            url: "/video",
                            resolve: {
                                videoGroups: function (videoService) {
                                    return videoService.getVideoGroups();
                                }
                            },
                            views: {
                                "header": {
                                    templateUrl: "template/shared/header.html"
                                },
                                "mainContent": {
                                    template: "<div ui-view></div>",
                                    controller: function ($state, videoGroups) {
                                        $state.go('video.group', {videoGroupId: videoGroups[0].id});
                                    }
                                }
                            }
                        })
                        // 影片群組
                        .state('video.group', {
                            url: "/group/:videoGroupId",
                            resolve: {
                                videos: function ($stateParams, videoService) {
                                    return videoService.getVideosByGroupId($stateParams.videoGroupId);
                                }
                            },
                            templateUrl: "template/video/videoGroup.html",
                            controller: 'videoGroupController',
                            controllerAs: 'videoGroupCtrl'
                        })
                        // 影片內容
                        .state('video.group.detail', {
                            url: "/video/:videoId",
                            templateUrl: 'template/video/video.html',
                            controller: 'videoController',
                            controllerAs: 'videoCtrl'
                        });
            })
            .run(function ($rootScope, blockUI) {
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    if (toState.resolve) {
                        blockUI.start();
                    }
                });
                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    if (toState.resolve) {
                        blockUI.stop();
                    }
                });
            });
