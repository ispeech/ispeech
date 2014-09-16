module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        url: {
            components: {
                dist: "app/templates",
                file: "app/static/jade/components",

                list: {
                    dist: "app/templates/list",
                    file: "app/static/jade/components/list"
                },

                account: {
                    dist: "app/templates/account",
                    file: "app/static/jade/components/account"
                },

                article: {
                    dist: "app/templates/article",
                    file: "app/static/jade/components/article"
                },

                other: {
                    dist: "app/templates/other",
                    file: "app/static/jade/components/other"
                }
            }
        },

        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: true,
                        timestamp: "<%= grunt.template.today() %>"
                    }
                },

                files: {
                    "app/index.html": "app/static/jade/index.jade",
                    "<%= url.components.dist %>/header.html": "<%= url.components.file %>/header.jade",
                    "<%= url.components.dist %>/footer.html": "<%= url.components.file %>/footer.jade",
                    "<%= url.components.dist %>/navbar.html": "<%= url.components.file %>/navbar.jade",
                    "<%= url.components.other.dist %>/login.html": "<%= url.components.other.file %>/login.jade",

                    "<%= url.components.list.dist %>/body.html": "<%= url.components.list.file %>/body.jade",
                    "<%= url.components.list.dist %>/body.slideshow.html": "<%= url.components.list.file %>/body.slideshow.jade",
                    "<%= url.components.list.dist %>/body.item.html": "<%= url.components.list.file %>/body.item.jade",
                    "<%= url.components.list.dist %>/body.search.html": "<%= url.components.list.file %>/body.search.jade",

                    "<%= url.components.account.dist %>/body.html": "<%= url.components.account.file %>/body.jade",
                    "<%= url.components.account.dist %>/body.user.html": "<%= url.components.account.file %>/body.user.jade",

                    "<%= url.components.article.dist %>/body.html": "<%= url.components.article.file %>/body.jade",
                    "<%= url.components.article.dist %>/body.abstract.html": "<%= url.components.article.file %>/body.abstract.jade",
                    "<%= url.components.article.dist %>/body.left.html": "<%= url.components.article.file %>/body.left.jade",
                    "<%= url.components.article.dist %>/body.right.html": "<%= url.components.article.file %>/body.right.jade",

                }
            }
        },

        jadephp: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: true,
                        timestamp: "<%= grunt.template.today() %>"
                    }
                },

                files: {
                    "app/base.php": "app/static/jade/base.jade",
                    "app/index.php": "app/static/jade/index.jade",
                    "app/article.php": "app/static/jade/article.jade",

                    "<%= url.components.dist %>/header.php": "<%= url.components.file %>/header.jade",
                    "<%= url.components.dist %>/footer.php": "<%= url.components.file %>/footer.jade",
                    "<%= url.components.dist %>/navbar.php": "<%= url.components.file %>/navbar.jade",
                    "<%= url.components.other.dist %>/login.php": "<%= url.components.other.file %>/login.jade",

                    "<%= url.components.list.dist %>/body.php": "<%= url.components.list.file %>/body.jade",
                    "<%= url.components.list.dist %>/body.slideshow.php": "<%= url.components.list.file %>/body.slideshow.jade",
                    "<%= url.components.list.dist %>/body.item.php": "<%= url.components.list.file %>/body.item.jade",
                    "<%= url.components.list.dist %>/body.search.php": "<%= url.components.list.file %>/body.search.jade",

                    "<%= url.components.account.dist %>/body.php": "<%= url.components.account.file %>/body.jade",
                    "<%= url.components.account.dist %>/body.user.php": "<%= url.components.account.file %>/body.user.jade",

                    "<%= url.components.article.dist %>/body.php": "<%= url.components.article.file %>/body.jade",
                    "<%= url.components.article.dist %>/body.abstract.php": "<%= url.components.article.file %>/body.abstract.jade",
                    "<%= url.components.article.dist %>/body.left.php": "<%= url.components.article.file %>/body.left.jade",
                    "<%= url.components.article.dist %>/body.right.php": "<%= url.components.article.file %>/body.right.jade",

                }
            }
        },

        livescript: {
            src: {
                files: {
                    'app/static/js/ispeech-livescript.js': 'app/static/ls/ispeech-livescript.ls', // 1:1 compile
                    'static/js/another.js': ['static/ls/*.ls'] // compile and concat into single file
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'app/static/sass',
                    cssDir: 'app/static/css',
                    noLineComments: false
                }
            }
        },

        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
          },
          dist: {
            files: {
              'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
          }
        },

        'sftp-deploy': {
            build: {
                auth: {
                    host: 'www.i-speech.net',
                    port: 22,
                    authKey: 'key1'
                },
                cache: 'sftpCache.json',
                src: 'app',
                dest: '/www/speech',
                exclusions: ['app/.DS_Store',
                             // 'app/bower_components',
                             // 'app/templates',

                             'app/static/.sass-cache',
                             'app/static/jade',
                             'app/static/ls',
                             'app/static/sass',
                             ],
                // serverSep: '/',
                // concurrency: 4,
                progress: true
            }
        },

        watch: {
            css: {
                files: ['app/static/sass/*.scss','app/static/sass/*.sass','app/static/sass/components/*.sass','app/static/sass/foundation/*.sass','app/static/sass/structures/*.sass'],
                tasks: ['compass'],
                options: {
                  livereload: true,
                }
            },

            js: {
                files: 'app/static/ls/*.ls',
                tasks: ['livescript']
            },

            html: {
                files: ['app/static/jade/*.jade',
                        'app/static/jade/components/*.jade',
                        'app/static/jade/components/list/*.jade',
                        'app/static/jade/components/article/*.jade',
                        'app/static/jade/components/account/*.jade',
                        'app/static/jade/components/other/*.jade'
                        ],
                tasks: ['jadephp']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jade-php');
    grunt.loadNpmTasks('grunt-livescript');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['sftp-deploy']);

};
