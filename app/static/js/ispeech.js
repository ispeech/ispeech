var ISPEECH = ISPEECH || {};

(function(w, d) {

    ISPEECH.constant = {
        ERROR_IMAGE: 'http://www.metalcuttingtools.eu/sites/default/files/default_images/thumbnail-default.jpg'
    },

    ISPEECH.controller = {

        header: function ($scope, Facebook) {
            var self = this;
            self.account = function () {
                // $state.go('account');
            }

            self.login = function () {
                // From now on you can use the Facebook service just as Facebook api says
                Facebook.login(function(response) {
                // Do something with response.
                    if (response.status == 'connected') {

                        // AJAX.userSystem.postLogin({
                        //     facebookkey: '1044185450'
                        // },function(res){
                        //     self.list = res;
                        // },function(res){
                        //     // addAlert()
                        // })
                        ISPEECH.env.login.status = true;
                        self.me();
                    }
                    console.log(response.authResponse.accessToken)
                });
            };

            self.logout = function() {
                Facebook.logout(function() {
                  $scope.$apply(function() {
                    self.user   = {};
                    ISPEECH.env.login.status = false;
                  });
                });
            }

            self.getLoginStatus = function() {
              Facebook.getLoginStatus(function(response) {
                if(response.status === 'connected') {
                  ISPEECH.env.login.status = true;
                } else {
                  ISPEECH.env.login.status = false;
                }
              });
            };

            self.me = function() {
              Facebook.api('/me?fields=picture', function(response) {
                self.user = response;
                console.log(response)
              });
            };
        },

        footer: function (websiteCopyWriting) {
            var self = this;
            self.items = websiteCopyWriting.footer;
        },

        index: function ($scope, AJAX, $http) {
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

        article: function ($scope, $sce, AJAX) {
            var self = this,
                query = ISPEECH.utils.decodeQueryData(document.location.href);

            AJAX.article.getArticle({
                id: query.id
            },function(res){
                // console.log(self.article.video)
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
            },function(res){
                // $state.go('list');
            })
        }
    }

    ISPEECH.service = {

        // AJAX service
        AJAX: function ($http, $q, $timeout, API) {

            var __get = function (data, url, succss_callback, error_callback) {
                // var url = url + '?callback=JSON_CALLBACK';
                // $http.jsonp(url,{
                //     params: data
                // })

                // function angular.callbacks._0 (res) {
                //     console.log(res)
                // }
                // .success(succss_callback)
                // .error(error_callback)

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
                        var url = API.SERVER + API.getArticle + data.id;
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
            var True = ISPEECH.midware.getArticle,
                res = data[0];

            True.lecturer.name = res.author;

            True.speech.chinese = res.tw_content;
            True.speech.english = res.en_content;
            True.speech.mix = res.tw_en_content;

            True.title = res.tw_title;
            // True.tags = res.tag;
            True.video = res.video_link;
            True.abstract = res.description;

            // True.coverPhoto = 'http://www.i-speech.net/erp_version/demo/upload_files/activity/' + res.c_image;

        },
        getArticle: {

            lecturer: {
                name: 'wilson',
                lectureDate: null,
                photo: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p160x160/10314011_10202684084237605_1762184246269689844_n.jpg?oh=90c483da75acecef96b6930c1264b6c3&oe=549536F0&__gda__=1417876672_3e0883450a06111483eff7bb3917a82e'
            },

            title: '賈伯斯在1970年代末與蘋果公司另一始創人',
            abstract: '賈伯斯在1970年代末與蘋果公司另一始創人史蒂芬·沃茲尼亞克及首任投資者邁克·馬庫拉協同其他人設計、開發及銷售Apple II系列。在1980年代初，賈伯斯是最早看到Xerox PARC的滑鼠驅動圖形用戶介面的商業潛力，並將其應用於Apple Lisa及一年後的麥金塔電腦。',
            tags: ['有趣', '時事', '蘋果'],
            coverPhoto: 'http://38.media.tumblr.com/a0bcc39d4e7412072d08e085e888e682/tumblr_nb1up3J7l01st5lhmo1_1280.jpg',
            updateDate: '',
            video: '<iframe width="560" height="315" src="//www.youtube.com/embed/VgyK3e-MIFU" frameborder="0" allowfullscreen></iframe>',

            speech: {
                // chinese: '',
                // mix: '',
                // english: '',
                chinese: '<h1>一、你們相信原先設定的願景嗎？</h1><p>當您接觸到新創公司創辦人和團隊時，最先要問的就是請他們闡述公司的願景，以及使他們每天早晨起床的動力是什麼。您可以評估：他們是否真正相信公司的願景，而這些願景能不能夠打動您。以Airbnb 為例，他們的願景是「讓人們感覺像是回到家一般，不論是在世界何處。」如果你是一個相信深入當地環境才能真正體會外國文化的人，那麼你的願景就與他們一致。arbndAirbnb 全球成長量。來源：Airbnb 年度成長報告</p><h1>二、團隊還有哪些人？</h1><p>理想的團隊是由來自不同領域的人才組合而成，也因此您的同事在某些方面都有過人之處，您將會深受他們影響並從中學習。就像優秀的工程師能夠吸引其他工程師一般，優秀的設計師對其他設計師也是一項極大的誘因。在與新創公司團隊洽談時，您是否深受他們啟發？是否對未來能從他們身上吸取經驗、學習到很多東西充滿信心？有一個核心問題是您一定要問的：這間公司是否有設計團隊？假設這間公司擁有大量的工程師，但只有一位設計師或沒有任何設計師的話，您就有可能擔任團隊的管理者或者要創造一個設計團隊前提是您有規劃要擔任這樣的角色。如果不是的話，您還是需要找出您夢想中的設計師團隊， Bridge 的設計師 Andrew Chin 指出：許多在 Dropbox 的設計師擁有「推出前所未有成功產品── Facebook、Spotify、Rdio、Instagram 等等的輝煌經歷。」而與這些優秀的人一同工作，能幫助您的工作更上一層樓。</p><h1>三、您是否會擔任決策的夥伴？</h1><p>如果您想要對產品的所有細節發揮效用，甚至對公司的設計有影響力，願意承擔風險來換取創新的果效；就要注意某些大公司擁有多層次的官僚體系或者是某些建立完善的公司，通常不適合您，因為他們通常害怕失去既有利益，只願意作漸進式的變革。深度挖掘這家公司的決策是如何制定的？是否一切決策都由創辦人或工程師經手，而設計師只有「美化」他們已經決定好事情的份？如果是這樣，這便不是任何設計師理想中的公司，一個共同合作的工作環境是必要的。 Pinterest 的設計師與共同創辦人 Evan Sharp 表示：我們不會用一個人的技能組合來劃分彼此，例如把設計、工程和品牌經營完全切分。我們很清楚只有將權力下放給各個優秀的人，讓他們皆能把工作做到最好，並給予空間設計所有所需的工作過程，公司才會成功。因此，在 Pinterest 我們總是『共同編織』、相互合作，以便將最好的結果提供給使用者。</p><h1>四、是否有重視設計的公司文化？</h1><p>公司的組織方式也需要特別注意。設計師是否有強而有力的發言權，能夠影響決策；抑或是設計師的地位總是附屬在某些副董事長呢？公司是否有提供充分經費打造優秀的設計團隊，並慷慨投資創意的產出（從一面白板到能夠大圖輸出的印表機皆是投資）？同時您也要考慮辦公室的環境空間是如何設計的。這家公司是否有提供促進跨領域合作的空間？當您與公司員工聊天時，他們是否清楚瞭解本身工作的意義？他們的實際作為是否反映公司的核心價值？我還記得走進 Square 的創意空間，內部瀰漫著創意能量──而這創意能量不限於產品設計師，Square 公司裡面還有攝影師、影音創作者、甚至說故事的人──這些通常不會在新創公司裡面見到的角色。這些小細節堆疊出重視設計的公司文化。五、您與公司能夠創造出多少價值？如果您加入一家新創公司，確保您知道您的工作內容，以及這份工作能帶來多少價值。詢問清楚您是要解決一項歷史悠久的問題呢？或是您要來解決一項沒有人解決的產品特色嗎？公司是否真正有設計需求，若答案是肯定的，就意味著您完成任務就等同是幫工司除去一項障礙。考慮公司是處於有趣的成長階段，是否在服務剛起飛或產品發展的早期──這些都是設計可以真正發揮影響力的階段。在理想的情況，您將會擁有影響數以百萬計人們的潛力，或者是長期創造出數十億美元的價值。您同樣也要確保公司發展良好，而您也會擁有高比例的持股。公司未來的前景是否看好？Khan Academy 的首席設計師 Jason Rosoff 指出：處理一項擁有數以百萬計使用者的產品是很棒的事情，然而一個影響數以百萬計人們著手改善生活以及週遭環境的角色，對世界產生更大的影響。</p><p>我希望以上所列的問題，可以幫助任何一位想要加入新創公司的設計師。</p>',
                english: '<h1>Lesson one</h1><p>Food truck fixie locavore, accusamus mcsweeneys marfa nulla single-origin coffee squid.</p><p> Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. </p><p>Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>',
                mix: '<h1>Lesson one</h1><h1 class="mix">一、你們相信原先設定的願景嗎？</h1><p> Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. </p><p class="mix">當您接觸到新創公司創辦人和團隊時，最先要問的就是請他們闡述公司的願景，以及使他們每天早晨起床的動力是什麼。您可以評估：他們是否真正相信公司的願景，而這些願景能不能夠打動您。以 Airbnb 為例，他們的願景是「讓人們感覺像是回到家一般，不論是在世界何處。」如果你是一個相信深入當地環境才能真正體會外國文化的人，那麼你的願景就與他們一致。arbndAirbnb 全球成長量。來源：Airbnb 年度成長報告</p><p>Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p><p class="mix">理想的團隊是由來自不同領域的人才組合而成，也因此您的同事在某些方面都有過人之處，您將會深受他們影響並從中學習。就像優秀的工程師能夠吸引其他工程師一般，優秀的設計師對其他設計師也是一項極大的誘因。在與新創公司團隊洽談時，您是否深受他們啟發？是否對未來能從他們身上吸取經驗、學習到很多東西充滿信心？有一個核心問題是您一定要問的：這間公司是否有設計團隊？假設這間公司擁有大量的工程師，但只有一位設計師或沒有任何設計師的話，您就有可能擔任團隊的管理者或者要創造一個設計團隊......前提是您有規劃要擔任這樣的角色。如果不是的話，您還是需要找出您夢想中的設計師團隊， Bridge 的設計師 Andrew Chin 指出：許多在 Dropbox 的設計師擁有「推出前所未有成功產品── Facebook、Spotify、Rdio、Instagram 等等的輝煌經歷。」而與這些優秀的人一同工作，能幫助您的工作更上一層樓。</p>'
            },

            relations: [{
                image: 'http://tw.mjjq.com/pic/20070510/20070510032908935.jpg',
                title: 'PM2.5 空氣中的隱形殺手',
                description: '學運過後，年輕人的滿腔怒火尚未就此熄滅，隨著參與公共事務成了顯學，青年中又吹起了一股新風潮，那就是回鄉實際參與基層村里長選舉，企圖從鄉里體制...',
                readNum: 100,
                id: 12
            },{
                image: 'http://tw.mjjq.com/pic/20070510/20070510032908935.jpg',
                title: '月薪45K雇你搞革命 ── 年輕人，回鄉參選村里長吧！',
                description: '你一天要呼吸幾次？你知道你很有可能吸入空氣中隱形的健康殺手？天空灰灰的，你可能以為是「霧」，其實是「霾」！PM2.5已經成為全球高度關注...',
                readNum: 100,
                id: 13
            },{
                image: 'http://tw.mjjq.com/pic/20070510/20070510032908935.jpg',
                title: '單打獨鬥的台灣文創',
                description: '為申辦世界設計之都，首爾完整回顧代表高麗的精神與事物，統整出51項可精進的文化資產，建設包括北村韓屋、東大門設計廣場、漢江文藝復興計畫，首爾...',
                readNum: 100,
                id: 14
            }]

        },

        getListMapping: function (data) {
            $.map(data, function(v, i){
                ISPEECH.midware.getList[i] = {};
                var True = ISPEECH.midware.getList[i];

                True.id = v.c_id;
                True.tags = v.tag;
                True.abstract = v.description;
                True.coverPhoto = 'http://manage.i-speech.net/erp_version/demo/upload_files/activity/' + v.c_image;
                True.title = v.tw_title;
                True.name = v.m_name;
            });
        },
        getList: [],

        getTagMapping: function () {},
        getTag: {},
    },

    ISPEECH.env = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        fixTop: $('.fix-section') ? 0 : $('.fix-section').offset().top,
        login: {
            status: false,
            userName: 'Wei Chen'
        }
    }

    ISPEECH.utils = {
        demo: (function(argument) {
            var privateNum = 2;
            return {
                method: function function_name(argument) {
                    // body...
                }
            }
            // body...
        })(),

        decodeQueryData: function(str) {
            // support parameter extract from both querystring or hash
            // not support multi value for single key yet.
            var data = {};
            str = str.replace(/.*\?/, '')
            var parts = str.split(/[#&]/);
            // remove the first part

            for (var i = 0; i < parts.length; i++) {
                var vs = parts[i].split('=');
                if (vs.length == 2) {
                    var key = decodeURIComponent(vs[0]);
                    var value = decodeURIComponent(vs[1]);
                    data[key] = value;
                }
            }
            return data;
        },

        calculateFixWidth: function(nowWidth){
            var width;

            if(nowWidth <= 1170){
                width = 362;
            }else{
                width = 445;
            }

            return width
        }
    }

    ISPEECH.event = {


        /**
         * @author       Rob W <gwnRob@gmail.com>
         * @website      http://stackoverflow.com/a/7513356/938089
         * @version      20131010
         * @description  Executes function on a framed YouTube video (see website link)
         *               For a full list of possible functions, see:
         *               https://developers.google.com/youtube/js_api_reference
         * @param String frame_id The id of (the div containing) the frame
         * @param String func     Desired function to call, eg. "playVideo"
         *        (Function)      Function to call when the player is ready.
         * @param Array  args     (optional) List of arguments to pass to function func*/
        // callPlayer: function (frame_id, func, args) {
        //     if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
        //     var iframe = document.getElementById(frame_id);
        //     if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        //         iframe = iframe.getElementsByTagName('iframe')[0];
        //     }

        //     // When the player is not ready yet, add the event to a queue
        //     // Each frame_id is associated with an own queue.
        //     // Each queue has three possible states:
        //     //  undefined = uninitialised / array = queue / 0 = ready
        //     if (!callPlayer.queue) callPlayer.queue = {};
        //     var queue = callPlayer.queue[frame_id],
        //         domReady = document.readyState == 'complete';

        //     if (domReady && !iframe) {
        //         // DOM is ready and iframe does not exist. Log a message
        //         window.console && console.log('callPlayer: Frame not found; id=' + frame_id);
        //         if (queue) clearInterval(queue.poller);
        //     } else if (func === 'listening') {
        //         // Sending the "listener" message to the frame, to request status updates
        //         if (iframe && iframe.contentWindow) {
        //             func = '{"event":"listening","id":' + JSON.stringify(''+frame_id) + '}';
        //             iframe.contentWindow.postMessage(func, '*');
        //         }
        //     } else if (!domReady ||
        //                iframe && (!iframe.contentWindow || queue && !queue.ready) ||
        //                (!queue || !queue.ready) && typeof func === 'function') {
        //         if (!queue) queue = callPlayer.queue[frame_id] = [];
        //         queue.push([func, args]);
        //         if (!('poller' in queue)) {
        //             // keep polling until the document and frame is ready
        //             queue.poller = setInterval(function() {
        //                 callPlayer(frame_id, 'listening');
        //             }, 250);
        //             // Add a global "message" event listener, to catch status updates:
        //             messageEvent(1, function runOnceReady(e) {
        //                 if (!iframe) {
        //                     iframe = document.getElementById(frame_id);
        //                     if (!iframe) return;
        //                     if (iframe.tagName.toUpperCase() != 'IFRAME') {
        //                         iframe = iframe.getElementsByTagName('iframe')[0];
        //                         if (!iframe) return;
        //                     }
        //                 }
        //                 if (e.source === iframe.contentWindow) {
        //                     // Assume that the player is ready if we receive a
        //                     // message from the iframe
        //                     clearInterval(queue.poller);
        //                     queue.ready = true;
        //                     messageEvent(0, runOnceReady);
        //                     // .. and release the queue:
        //                     while (tmp = queue.shift()) {
        //                         callPlayer(frame_id, tmp[0], tmp[1]);
        //                     }
        //                 }
        //             }, false);
        //         }
        //     } else if (iframe && iframe.contentWindow) {
        //         // When a function is supplied, just call it (like "onYouTubePlayerReady")
        //         if (func.call) return func();
        //         // Frame exists, send message
        //         iframe.contentWindow.postMessage(JSON.stringify({
        //             "event": "command",
        //             "func": func,
        //             "args": args || [],
        //             "id": frame_id
        //         }), "*");
        //     }
        //     /* IE8 does not support addEventListener... */
        //     function messageEvent(add, listener) {
        //         var w3 = add ? window.addEventListener : window.removeEventListener;
        //         w3 ?
        //             w3('message', listener, !1)
        //         :
        //             (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
        //     }
        // },

        displayFilm: function () {
            $('#myTab').waypoint(function(direction) {
                if(direction == 'up') {
                    $('.film').removeClass('moveIn');
                } else if (direction == 'down') {
                    $('.film').addClass('moveIn');
                }

                console.log('scroll'+direction)
            });

            $('#myTab').waypoint(function(direction) {
                if(direction == 'down') {
                    $('.film').removeClass('moveIn');
                } else if (direction == 'up') {
                    $('.film').addClass('moveIn');
                }

                console.log('scroll'+direction)
            },{
                offset: function() {
                    return $.waypoints('viewportHeight') - $(this).height() + 100;
                }
            });
        },

        load: function () {


            // $('#myTab').waypoint(function(direction) {
            //     $('.film').toggleClass('moveIn');
            //     console.log('scroll'+direction)
            // },{
            //     offset: function() {
            //         return $.waypoints('viewportHeight') - $(this).height() + 100;
            //     }
            // });
            // ISPEECH.event.callPlayer();
            // ISPEECH.event._verticalAlign();
            ISPEECH.event.displayFilm();

            if( ISPEECH.env.login.status )
                ISPEECH.event.bindLoginEvent();
            else
                ISPEECH.event.bindNotLoginEvent();
        },

        resize: function () {
            // ISPEECH.event._verticalAlign();
            // ISPEECH.event._fixed();
        },

        scroll: function () {
            // ISPEECH.event._verticalAlign();
            // ISPEECH.event._fixed();
            ISPEECH.effect.coverPhotParallax();
        },

        _verticalAlign: function(){
            // var $win = $(window),
            //     $layoutChange = $('.layout-change'),
            //     $imgResponsive = $('.img-responsive'),
            //     screenWidth = $win.width(),
            //     scollbarWidth = 15;
            //     mobile = 768 - scollbarWidth,
            //     verticalAlignMiddle = ($('.author').height() - $imgResponsive.height())/2;

            // if(screenWidth >= mobile){
            //     $imgResponsive.css('margin-top',verticalAlignMiddle);
            // }else{
            //     $imgResponsive.attr('style','');
            // }

        },

        _fixed: function(){

            // var $win = $(window),
            //     $fix = $('.fix-section'),
            //     maxHeight = document.body.scrollHeight - 1000,
            //     screenWidth = $win.width(),
            //     scrollY = $win.scrollTop(),
            //     minHeight = ISPEECH.env.fixTop - 100,
            //     detlaY = scrollY - minHeight;

            // if(screenWidth > 980){
            //     if(minHeight <= scrollY && scrollY <= maxHeight){
            //         $fix.addClass('fixed').css({
            //             'width': ISPEECH.utils.calculateFixWidth(screenWidth),
            //             'top': detlaY
            //         });
            //     }else{
            //         $fix.removeClass('fixed').attr('style','');
            //     }
            // }else{
            //     $fix.removeClass('fixed').attr('style','');
            // }

        },

        clickMenu: function(){
            // $('.menu').toggle()
        },

        bindNotLoginEvent: function() {
            // $('#myModal').modal('show');



            // $('.advanced_btn, .advanced_btn_mobile').on('click',function () {
            //     $('#myModal').modal('show');
            // });

        },

        bindLoginEvent: function () {

            // $('#show_side_menu,.open_nav').on('click',function(){
            //     $('body').addClass("sidemenu_visible");
            // });

            // $('#sidenav_close,body').on('click',function(){
            //     $('body').removeClass("sidemenu_visible");
            // });

            // $('.navbar,.side_body').on('click',function (e) {
            //     e.stopPropagation();
            // });

            // $('.sticky-wrapper').waypoint('sticky');
        }

    }

    ISPEECH.effect = {
        coverPhotParallax: function () {

            // article photo scroll down
            $(window).on('scroll', function(){
                scrollTop = $(window).scrollTop();
                var dy = 0;
                dy -= scrollTop / 2;
                if(dy < 50) $('#coverPhoto,.slidesPhoto').css({'margin-top': dy + 'px'});
            });
        }
    }


})(window, document)