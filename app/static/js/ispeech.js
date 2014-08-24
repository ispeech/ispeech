(function() {
    var ISPEECH = ISPEECH || {};

    ISPEECH.namespace = function(ns_string) {
        var parts = ns_string.split('.'),
            parent = ISPEECH,
            i;

        if (parts[0] === "ISPEECH") {
            parts = parts.slice(1);
        }

        // typeof return string
        for (var i = 0; i < parts.length; i++) {
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }

            parent = parent[parts[i]];
        }

        return parent
    }

    ISPEECH.namespace('ISPEECH.utils.demo');


    ISPEECH.utils.demo = (function(argument) {
        var privateNum = 2;
        return {
            method: function function_name(argument) {
                // body...
            }
        }
        // body...
    })()
})()