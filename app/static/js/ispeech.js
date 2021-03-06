var ISPEECH = ISPEECH || {};

(function(w, d) {

    ISPEECH.controller = {

        header: function ($scope, Facebook) {

            var self = this;

            $scope.login = function () {
                // From now on you can use the Facebook service just as Facebook api says
                Facebook.login(function(response) {
                // Do something with response.
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }
                    console.log(response.authResponse.accessToken)
                });
            };

            $scope.logout = function() {
                Facebook.logout(function() {
                  $scope.$apply(function() {
                    $scope.user   = {};
                    $scope.logged = false;
                  });
                });
            }

            $scope.getLoginStatus = function() {
              Facebook.getLoginStatus(function(response) {
                if(response.status === 'connected') {
                  $scope.loggedIn = true;
                } else {
                  $scope.loggedIn = false;
                }
              });
            };

            $scope.me = function() {
              Facebook.api('/me', function(response) {
                $scope.user = response;
              });
            };
        },

        footer: function (websiteCopyWriting) {
            var self = this;
            self.items = websiteCopyWriting.footer;
        }
    }

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

    ISPEECH.midware = {

        getArticleMapping: function (data) {
            $.map(data, function(o){
                console.log(o)
            });
        },
        getArticle: {

            lecturer: {
                name: 'wilson',
                lectureDate: null,
                photo: ''
            },

            abstract: '賈伯斯在1970年代末與蘋果公司另一始創人史蒂芬·沃茲尼亞克及首任投資者邁克·馬庫拉協同其他人設計、開發及銷售Apple II系列。在1980年代初，賈伯斯是最早看到Xerox PARC的滑鼠驅動圖形用戶介面的商業潛力，並將其應用於Apple Lisa及一年後的麥金塔電腦。',
            tags: ['有趣', '時事', '蘋果'],
            coverPhoto: 'http://ofinksandpapers.files.wordpress.com/2011/10/126933-steve-jobs.jpg',
            updateDate: '',
            video: 'https://www.youtube.com/watch?v=VgyK3e-MIFU',

            speech: {
                chinese: '<h1>一、你們相信原先設定的願景嗎？</h1><p>當您接觸到新創公司創辦人和團隊時，最先要問的就是請他們闡述公司的願景，以及使他們每天早晨起床的動力是什麼。您可以評估：他們是否真正相信公司的願景，而這些願景能不能夠打動您。以Airbnb 為例，他們的願景是「讓人們感覺像是回到家一般，不論是在世界何處。」如果你是一個相信深入當地環境才能真正體會外國文化的人，那麼你的願景就與他們一致。arbndAirbnb 全球成長量。來源：Airbnb 年度成長報告</p><h1>二、團隊還有哪些人？</h1><p>理想的團隊是由來自不同領域的人才組合而成，也因此您的同事在某些方面都有過人之處，您將會深受他們影響並從中學習。就像優秀的工程師能夠吸引其他工程師一般，優秀的設計師對其他設計師也是一項極大的誘因。在與新創公司團隊洽談時，您是否深受他們啟發？是否對未來能從他們身上吸取經驗、學習到很多東西充滿信心？有一個核心問題是您一定要問的：這間公司是否有設計團隊？假設這間公司擁有大量的工程師，但只有一位設計師或沒有任何設計師的話，您就有可能擔任團隊的管理者或者要創造一個設計團隊前提是您有規劃要擔任這樣的角色。如果不是的話，您還是需要找出您夢想中的設計師團隊， Bridge 的設計師 Andrew Chin 指出：許多在 Dropbox 的設計師擁有「推出前所未有成功產品── Facebook、Spotify、Rdio、Instagram 等等的輝煌經歷。」而與這些優秀的人一同工作，能幫助您的工作更上一層樓。</p><h1>三、您是否會擔任決策的夥伴？</h1><p>如果您想要對產品的所有細節發揮效用，甚至對公司的設計有影響力，願意承擔風險來換取創新的果效；就要注意某些大公司擁有多層次的官僚體系或者是某些建立完善的公司，通常不適合您，因為他們通常害怕失去既有利益，只願意作漸進式的變革。深度挖掘這家公司的決策是如何制定的？是否一切決策都由創辦人或工程師經手，而設計師只有「美化」他們已經決定好事情的份？如果是這樣，這便不是任何設計師理想中的公司，一個共同合作的工作環境是必要的。 Pinterest 的設計師與共同創辦人 Evan Sharp 表示：我們不會用一個人的技能組合來劃分彼此，例如把設計、工程和品牌經營完全切分。我們很清楚只有將權力下放給各個優秀的人，讓他們皆能把工作做到最好，並給予空間設計所有所需的工作過程，公司才會成功。因此，在 Pinterest 我們總是『共同編織』、相互合作，以便將最好的結果提供給使用者。</p><h1>四、是否有重視設計的公司文化？</h1><p>公司的組織方式也需要特別注意。設計師是否有強而有力的發言權，能夠影響決策；抑或是設計師的地位總是附屬在某些副董事長呢？公司是否有提供充分經費打造優秀的設計團隊，並慷慨投資創意的產出（從一面白板到能夠大圖輸出的印表機皆是投資）？同時您也要考慮辦公室的環境空間是如何設計的。這家公司是否有提供促進跨領域合作的空間？當您與公司員工聊天時，他們是否清楚瞭解本身工作的意義？他們的實際作為是否反映公司的核心價值？我還記得走進 Square 的創意空間，內部瀰漫著創意能量──而這創意能量不限於產品設計師，Square 公司裡面還有攝影師、影音創作者、甚至說故事的人──這些通常不會在新創公司裡面見到的角色。這些小細節堆疊出重視設計的公司文化。五、您與公司能夠創造出多少價值？如果您加入一家新創公司，確保您知道您的工作內容，以及這份工作能帶來多少價值。詢問清楚您是要解決一項歷史悠久的問題呢？或是您要來解決一項沒有人解決的產品特色嗎？公司是否真正有設計需求，若答案是肯定的，就意味著您完成任務就等同是幫工司除去一項障礙。考慮公司是處於有趣的成長階段，是否在服務剛起飛或產品發展的早期──這些都是設計可以真正發揮影響力的階段。在理想的情況，您將會擁有影響數以百萬計人們的潛力，或者是長期創造出數十億美元的價值。您同樣也要確保公司發展良好，而您也會擁有高比例的持股。公司未來的前景是否看好？Khan Academy 的首席設計師 Jason Rosoff 指出：處理一項擁有數以百萬計使用者的產品是很棒的事情，然而一個影響數以百萬計人們著手改善生活以及週遭環境的角色，對世界產生更大的影響。</p><p>我希望以上所列的問題，可以幫助任何一位想要加入新創公司的設計師。</p>',
                english: '<h1>Lesson one</h1><p>Food truck fixie locavore, accusamus mcsweeneys marfa nulla single-origin coffee squid.</p><p> Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. </p><p>Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>',
                mix: '<h1>Lesson one</h1><h1 class="mix">一、你們相信原先設定的願景嗎？</h1><p> Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. </p><p class="mix">當您接觸到新創公司創辦人和團隊時，最先要問的就是請他們闡述公司的願景，以及使他們每天早晨起床的動力是什麼。您可以評估：他們是否真正相信公司的願景，而這些願景能不能夠打動您。以 Airbnb 為例，他們的願景是「讓人們感覺像是回到家一般，不論是在世界何處。」如果你是一個相信深入當地環境才能真正體會外國文化的人，那麼你的願景就與他們一致。arbndAirbnb 全球成長量。來源：Airbnb 年度成長報告</p><p>Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p><p class="mix">理想的團隊是由來自不同領域的人才組合而成，也因此您的同事在某些方面都有過人之處，您將會深受他們影響並從中學習。就像優秀的工程師能夠吸引其他工程師一般，優秀的設計師對其他設計師也是一項極大的誘因。在與新創公司團隊洽談時，您是否深受他們啟發？是否對未來能從他們身上吸取經驗、學習到很多東西充滿信心？有一個核心問題是您一定要問的：這間公司是否有設計團隊？假設這間公司擁有大量的工程師，但只有一位設計師或沒有任何設計師的話，您就有可能擔任團隊的管理者或者要創造一個設計團隊......前提是您有規劃要擔任這樣的角色。如果不是的話，您還是需要找出您夢想中的設計師團隊， Bridge 的設計師 Andrew Chin 指出：許多在 Dropbox 的設計師擁有「推出前所未有成功產品── Facebook、Spotify、Rdio、Instagram 等等的輝煌經歷。」而與這些優秀的人一同工作，能幫助您的工作更上一層樓。</p>'
            },

        },

        getListMapping: function () {},
        getList: {},

        getTagMapping: function () {},
        getTag: {},
    }

})(window, document)