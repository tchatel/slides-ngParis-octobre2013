'use strict';
(function () {

var module = angular.module('angular-showoff.services', []);

module.value('Util', {
    trim: function (text) {
        return text != undefined ? text.replace(/^\s+/g,'').replace(/\s+$/g,'') : text;
    },
    encodeHtmlChars: function (text) {
        return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
    }
});

/*
 * Service that loads and parses markdown source files
 */
module.factory('Presentation', ['Util', 'DeferredData', '$http', '$q', function (Util, DeferredData, $http, $q) {
    var markedOptions = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true
    };
    marked.setOptions(markedOptions);

    function splitSlides(html) {
        var slideRegex = new RegExp('<p>\!SLIDE([^<=]*)=* *</p>', 'g');
        var slides = [];
        var slideRegexResult, lastIndex = 0;
        while ((slideRegexResult = slideRegex.exec(html)) != null) {
            var info = Util.trim(slideRegexResult[1]);
            var title = '';
            var titleRegex = new RegExp('^(.*)&quot;(.*)&quot;(.*)$', '');
            var titleRegexResult = titleRegex.exec(info);
            if (titleRegexResult && titleRegexResult[2]) {
                title = titleRegexResult[2];
                info = Util.trim(Util.trim(titleRegexResult[1]) + ' ' + Util.trim(titleRegexResult[3]));
            }
            setPreviousSlideContent(html.substring(lastIndex, slideRegexResult.index));
            slides.push({info: info, title: title, index: slides.length});
            lastIndex = slideRegex.lastIndex;
        }
        setPreviousSlideContent(html.substring(lastIndex));
        return slides;

        function setPreviousSlideContent(content) {
            if (slides.length > 0) {
                var previousSlide = slides[slides.length - 1];
                previousSlide.content = previousSlide.title ? '<h1>' + previousSlide.title + '</h1>\n' : '';
                var notes = '', indexNotesFlag = content.indexOf('<p>!NOTES');
                if (indexNotesFlag != -1) {
                    notes = content.substring(content.indexOf('</p>', indexNotesFlag) + 4);
                    content = content.substring(0, indexNotesFlag);
                }
                content = content.replace(/<p>TIP: */g, '<p class="tip">');
                content = content.replace(/<p>CAUTION: */g, '<p class="caution">');
                content = content.replace(/<p>NOTE: */g, '<p class="note">');
                previousSlide.content += Util.trim(content);
                if (notes) {
                    previousSlide.content += '<div class="notes">';
                    previousSlide.content += Util.trim(notes);
                    previousSlide.content += '</div>';
                }
            }
        }
    }

    function transformSource(source, imgPath) {
        if (imgPath) {
            // inline: ![Alt text](/path/to/img.jpg)
            var find = new RegExp('! *\\[([^\\]]*)\\] *\\(([^\\)]*)\\)', 'g');
            source = source.replace(find, '![$1](' + imgPath + '/$2)');
        }
        return source;
    }

    function parse(source) {
        return source ? splitSlides(marked(source)) : [];
    }

    return {
        parseSource: function (source) {
            var allSlides = parse(source);
            var visibleSlides = [];
            for (var i = 0 ; i < allSlides.length ; i++) {
                if (allSlides[i].info.split(' ').indexOf('skip') == -1) {
                    visibleSlides.push(allSlides[i]);
                }
            }
            return visibleSlides;
        },
        loadSource: function (configPath) {
            var result = DeferredData.typeObject();

            $http.get(configPath).success(function (data) {
                var config = data;
                var source = {title: config.title, markdown: ''};
                var promise = $q.when('start'); // Already resolved promise
                for (var i = 0 ; i < config.sections.length ; i++ ) {
                    var mdFile = config.sections[i].file;
                    if (mdFile) {
                        promise = next(promise, mdFile, source);
                    }
                }
                promise.then(function (data) {
                    result.$resolve(source);
                }, function (error) {
                    result.error = error;
                    result.$resolve($q.reject(error));
                })
            }).error(function (error) {
                // TODO !!!!!
                result.$resolve($q.reject("error"));
            });

            return result;

            function next(promise, mdFile, source) {
                var dir = mdFile.substring(0, mdFile.lastIndexOf('/'));
                var nextDefer = $q.defer();
                promise.then(function () {
                    var httpPromise = $http.get( mdFile);
                    httpPromise.success(function (data) {
                        source.markdown += transformSource(data + "\n\n", dir);
                        nextDefer.resolve();
                    });
                    httpPromise.error(function (error) {
                        result.error = error;
                        nextDefer.reject(error);
                    });
                });
                return nextDefer.promise;
            }
        }
    };
}]);

})();