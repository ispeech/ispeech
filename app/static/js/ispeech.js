var ISPEECH = ISPEECH || {};

(function(w, d) {

    ISPEECH.service = {

        // AJAX service
        AJAX: function ($http, $q, $timeout, API) {

            var __get = function (data, url, succss_callback, error_callback) {
                $http({
                    method: "get",
                    url: url,
                    params: data
                })
                .success(succss_callback)
                .error(error_callback)
            }

            var __post = function (data, url, succss_callback, error_callback) {
                $http({
                    method: "post",
                    url: url,
                    data: data
                })
                .success(succss_callback)
                .error(error_callback)
            }

            // public method
            return {

                list: {
                    getTag: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.getTag;
                        __get(data, url, succss_callback, error_callback);
                    },

                    getList: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.getList;
                        __get(data, url, succss_callback, error_callback);
                    },

                    postSearch: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.postSearch;
                        __post(data, url, succss_callback, error_callback);
                    }
                },

                article: {
                    getArticle: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.getArticle;
                        __get(data, url, succss_callback, error_callback);
                    },

                    postRecord: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.postRecord;
                        __post(data, url, succss_callback, error_callback);
                    }
                },

                account: {
                    getUserInfo: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.getUserInfo;
                        __get(data, url, succss_callback, error_callback);
                    },

                    getPastCollectArticle: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.getPastCollectArticle;
                        __get(data, url, succss_callback, error_callback);
                    }
                },


                userBehavior: {
                    postCollect: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.postCollect;
                        __post(data, url, succss_callback, error_callback);
                    }
                },

                userSystem: {
                    postLogin: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.postLogin;
                        __post(data, url, succss_callback, error_callback);
                    },

                    postRigister: function (data, succss_callback, error_callback) {
                        var url = API.SERVER + API.postRigister;
                        __post(data, url, succss_callback, error_callback);
                    }
                }

            }
        },
    }

})(window, document)