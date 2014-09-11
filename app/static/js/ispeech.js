var ISPEECH = ISPEECH || {};

(function(w, d) {

    ISPEECH.controller = {

        header: function ($state, $scope, Facebook) {

            var self = this;
            self.account = function () {
                $state.go('account');
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
            True.video = '<div>' + res.video_link + '</div>';
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
            video: 'https://www.youtube.com/watch?v=VgyK3e-MIFU',

            speech: {
                chinese: '<h1>一、你們相信原先設定的願景嗎？</h1><p>當您接觸到新創公司創辦人和團隊時，最先要問的就是請他們闡述公司的願景，以及使他們每天早晨起床的動力是什麼。您可以評估：他們是否真正相信公司的願景，而這些願景能不能夠打動您。以Airbnb 為例，他們的願景是「讓人們感覺像是回到家一般，不論是在世界何處。」如果你是一個相信深入當地環境才能真正體會外國文化的人，那麼你的願景就與他們一致。arbndAirbnb 全球成長量。來源：Airbnb 年度成長報告</p><h1>二、團隊還有哪些人？</h1><p>理想的團隊是由來自不同領域的人才組合而成，也因此您的同事在某些方面都有過人之處，您將會深受他們影響並從中學習。就像優秀的工程師能夠吸引其他工程師一般，優秀的設計師對其他設計師也是一項極大的誘因。在與新創公司團隊洽談時，您是否深受他們啟發？是否對未來能從他們身上吸取經驗、學習到很多東西充滿信心？有一個核心問題是您一定要問的：這間公司是否有設計團隊？假設這間公司擁有大量的工程師，但只有一位設計師或沒有任何設計師的話，您就有可能擔任團隊的管理者或者要創造一個設計團隊前提是您有規劃要擔任這樣的角色。如果不是的話，您還是需要找出您夢想中的設計師團隊， Bridge 的設計師 Andrew Chin 指出：許多在 Dropbox 的設計師擁有「推出前所未有成功產品── Facebook、Spotify、Rdio、Instagram 等等的輝煌經歷。」而與這些優秀的人一同工作，能幫助您的工作更上一層樓。</p><h1>三、您是否會擔任決策的夥伴？</h1><p>如果您想要對產品的所有細節發揮效用，甚至對公司的設計有影響力，願意承擔風險來換取創新的果效；就要注意某些大公司擁有多層次的官僚體系或者是某些建立完善的公司，通常不適合您，因為他們通常害怕失去既有利益，只願意作漸進式的變革。深度挖掘這家公司的決策是如何制定的？是否一切決策都由創辦人或工程師經手，而設計師只有「美化」他們已經決定好事情的份？如果是這樣，這便不是任何設計師理想中的公司，一個共同合作的工作環境是必要的。 Pinterest 的設計師與共同創辦人 Evan Sharp 表示：我們不會用一個人的技能組合來劃分彼此，例如把設計、工程和品牌經營完全切分。我們很清楚只有將權力下放給各個優秀的人，讓他們皆能把工作做到最好，並給予空間設計所有所需的工作過程，公司才會成功。因此，在 Pinterest 我們總是『共同編織』、相互合作，以便將最好的結果提供給使用者。</p><h1>四、是否有重視設計的公司文化？</h1><p>公司的組織方式也需要特別注意。設計師是否有強而有力的發言權，能夠影響決策；抑或是設計師的地位總是附屬在某些副董事長呢？公司是否有提供充分經費打造優秀的設計團隊，並慷慨投資創意的產出（從一面白板到能夠大圖輸出的印表機皆是投資）？同時您也要考慮辦公室的環境空間是如何設計的。這家公司是否有提供促進跨領域合作的空間？當您與公司員工聊天時，他們是否清楚瞭解本身工作的意義？他們的實際作為是否反映公司的核心價值？我還記得走進 Square 的創意空間，內部瀰漫著創意能量──而這創意能量不限於產品設計師，Square 公司裡面還有攝影師、影音創作者、甚至說故事的人──這些通常不會在新創公司裡面見到的角色。這些小細節堆疊出重視設計的公司文化。五、您與公司能夠創造出多少價值？如果您加入一家新創公司，確保您知道您的工作內容，以及這份工作能帶來多少價值。詢問清楚您是要解決一項歷史悠久的問題呢？或是您要來解決一項沒有人解決的產品特色嗎？公司是否真正有設計需求，若答案是肯定的，就意味著您完成任務就等同是幫工司除去一項障礙。考慮公司是處於有趣的成長階段，是否在服務剛起飛或產品發展的早期──這些都是設計可以真正發揮影響力的階段。在理想的情況，您將會擁有影響數以百萬計人們的潛力，或者是長期創造出數十億美元的價值。您同樣也要確保公司發展良好，而您也會擁有高比例的持股。公司未來的前景是否看好？Khan Academy 的首席設計師 Jason Rosoff 指出：處理一項擁有數以百萬計使用者的產品是很棒的事情，然而一個影響數以百萬計人們著手改善生活以及週遭環境的角色，對世界產生更大的影響。</p><p>我希望以上所列的問題，可以幫助任何一位想要加入新創公司的設計師。</p>',
                english: '<h1>Lesson one</h1><p>Food truck fixie locavore, accusamus mcsweeneys marfa nulla single-origin coffee squid.</p><p> Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. </p><p>Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>',
                mix: '<h1>Lesson one</h1><h1 class="mix">一、你們相信原先設定的願景嗎？</h1><p> Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. </p><p class="mix">當您接觸到新創公司創辦人和團隊時，最先要問的就是請他們闡述公司的願景，以及使他們每天早晨起床的動力是什麼。您可以評估：他們是否真正相信公司的願景，而這些願景能不能夠打動您。以 Airbnb 為例，他們的願景是「讓人們感覺像是回到家一般，不論是在世界何處。」如果你是一個相信深入當地環境才能真正體會外國文化的人，那麼你的願景就與他們一致。arbndAirbnb 全球成長量。來源：Airbnb 年度成長報告</p><p>Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p><p class="mix">理想的團隊是由來自不同領域的人才組合而成，也因此您的同事在某些方面都有過人之處，您將會深受他們影響並從中學習。就像優秀的工程師能夠吸引其他工程師一般，優秀的設計師對其他設計師也是一項極大的誘因。在與新創公司團隊洽談時，您是否深受他們啟發？是否對未來能從他們身上吸取經驗、學習到很多東西充滿信心？有一個核心問題是您一定要問的：這間公司是否有設計團隊？假設這間公司擁有大量的工程師，但只有一位設計師或沒有任何設計師的話，您就有可能擔任團隊的管理者或者要創造一個設計團隊......前提是您有規劃要擔任這樣的角色。如果不是的話，您還是需要找出您夢想中的設計師團隊， Bridge 的設計師 Andrew Chin 指出：許多在 Dropbox 的設計師擁有「推出前所未有成功產品── Facebook、Spotify、Rdio、Instagram 等等的輝煌經歷。」而與這些優秀的人一同工作，能幫助您的工作更上一層樓。</p>'
            },

        },

        getListMapping: function (data) {
            $.map(data, function(v, i){
                ISPEECH.midware.getList[i] = {};
                var True = ISPEECH.midware.getList[i];

                True.id = v.c_id;
                True.tags = v.tag;
                True.abstract = v.description;
                True.coverPhoto = 'http://www.i-speech.net/erp_version/demo/upload_files/activity/' + v.c_image;
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
        callPlayer: function (frame_id, func, args) {
            if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
            var iframe = document.getElementById(frame_id);
            if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
                iframe = iframe.getElementsByTagName('iframe')[0];
            }

            // When the player is not ready yet, add the event to a queue
            // Each frame_id is associated with an own queue.
            // Each queue has three possible states:
            //  undefined = uninitialised / array = queue / 0 = ready
            if (!callPlayer.queue) callPlayer.queue = {};
            var queue = callPlayer.queue[frame_id],
                domReady = document.readyState == 'complete';

            if (domReady && !iframe) {
                // DOM is ready and iframe does not exist. Log a message
                window.console && console.log('callPlayer: Frame not found; id=' + frame_id);
                if (queue) clearInterval(queue.poller);
            } else if (func === 'listening') {
                // Sending the "listener" message to the frame, to request status updates
                if (iframe && iframe.contentWindow) {
                    func = '{"event":"listening","id":' + JSON.stringify(''+frame_id) + '}';
                    iframe.contentWindow.postMessage(func, '*');
                }
            } else if (!domReady ||
                       iframe && (!iframe.contentWindow || queue && !queue.ready) ||
                       (!queue || !queue.ready) && typeof func === 'function') {
                if (!queue) queue = callPlayer.queue[frame_id] = [];
                queue.push([func, args]);
                if (!('poller' in queue)) {
                    // keep polling until the document and frame is ready
                    queue.poller = setInterval(function() {
                        callPlayer(frame_id, 'listening');
                    }, 250);
                    // Add a global "message" event listener, to catch status updates:
                    messageEvent(1, function runOnceReady(e) {
                        if (!iframe) {
                            iframe = document.getElementById(frame_id);
                            if (!iframe) return;
                            if (iframe.tagName.toUpperCase() != 'IFRAME') {
                                iframe = iframe.getElementsByTagName('iframe')[0];
                                if (!iframe) return;
                            }
                        }
                        if (e.source === iframe.contentWindow) {
                            // Assume that the player is ready if we receive a
                            // message from the iframe
                            clearInterval(queue.poller);
                            queue.ready = true;
                            messageEvent(0, runOnceReady);
                            // .. and release the queue:
                            while (tmp = queue.shift()) {
                                callPlayer(frame_id, tmp[0], tmp[1]);
                            }
                        }
                    }, false);
                }
            } else if (iframe && iframe.contentWindow) {
                // When a function is supplied, just call it (like "onYouTubePlayerReady")
                if (func.call) return func();
                // Frame exists, send message
                iframe.contentWindow.postMessage(JSON.stringify({
                    "event": "command",
                    "func": func,
                    "args": args || [],
                    "id": frame_id
                }), "*");
            }
            /* IE8 does not support addEventListener... */
            function messageEvent(add, listener) {
                var w3 = add ? window.addEventListener : window.removeEventListener;
                w3 ?
                    w3('message', listener, !1)
                :
                    (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
            }
        },

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
            ISPEECH.event._verticalAlign();
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

            // article photo scroll down
            $(window).on('scroll', function(){
                scrollTop = $(window).scrollTop();
                var dy = 0;
                dy -= scrollTop / 2;
                if(dy < 50) $('#coverPhoto,.slidesPhoto').css({'margin-top': dy + 'px'});
            });
        },

        _verticalAlign: function(){
            var $win = $(window),
                $layoutChange = $('.layout-change'),
                $imgResponsive = $('.img-responsive'),
                screenWidth = $win.width(),
                scollbarWidth = 15;
                mobile = 768 - scollbarWidth,
                verticalAlignMiddle = ($('.author').height() - $imgResponsive.height())/2;

            if(screenWidth >= mobile){
                // $imgResponsive.css('margin-top',verticalAlignMiddle);
            }else{
                $imgResponsive.attr('style','');
            }

        },

        _fixed: function(){

            var $win = $(window),
                $fix = $('.fix-section'),
                maxHeight = document.body.scrollHeight - 1000,
                screenWidth = $win.width(),
                scrollY = $win.scrollTop(),
                minHeight = ISPEECH.env.fixTop - 100,
                detlaY = scrollY - minHeight;

            if(screenWidth > 980){
                if(minHeight <= scrollY && scrollY <= maxHeight){
                    $fix.addClass('fixed').css({
                        'width': ISPEECH.utils.calculateFixWidth(screenWidth),
                        'top': detlaY
                    });
                }else{
                    $fix.removeClass('fixed').attr('style','');
                }
            }else{
                $fix.removeClass('fixed').attr('style','');
            }

        },

        clickMenu: function(){
            $('.menu').toggle()
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


})(window, document)