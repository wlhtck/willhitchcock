/** MRM Worldwide
 * Author: William J. Hitchcock
 * Date: August 23, 2016
 **/

var acadiaTraction = acadiaTraction || {};
~(function($) {
    $.extend(acadiaTraction, {
        aAnimationImgs: [],
        aAnimationImgsB: [],
        aImgUrls: [],
        autoplay: null,
        basePath: '',
        bAutoplay: true,
        $navItems: null,
        $_target: null, // the jquery object of the component // do not remove

        // initialize javascript
        init: function(selector) {
            var self = this, // make the component object accessible by other callbacks
                isiPad = navigator.userAgent.match(/iPad/i) != null,
                start = 0,
                end = 1;
            self.$_target = $(selector);
            self.basePath = self._getBasePath();
            if (self.$_target.length > 0) {
                // if the selector/component actually exist, then continue

                //*******  Init Code Here *******//
                self.$navItems = self.$_target.find('.nav')
                    .each(function() {
                        self.aImgUrls.push(self.basePath + $(this).data('img-url'));
                        self.aAnimationImgs.push(self.basePath + $(this).data('animation-img'));
                        self.aAnimationImgsB.push(self.basePath + $(this).data('animation-img-b'));
                    });

                //*******  End Init Code ********//

                // Call the bindings
                self.callBindings();
            }

        },
        preload: function() {
            if (this.preload.arguments.length > 1) {
                for (var i = this.preload.arguments.length - 1; i >= 0; i--) {
                    this.preload(this.preload.arguments[i]);
                };
            } else {
                var images = new Array()
                for (i = 0; i < this.preload.arguments[0].length; i++) {
                    images[i] = new Image()
                    images[i].src = this.preload.arguments[0][i];
                }
            }
        },

        callBindings: function() {
            // put all event listeners/bindings here when possible
            var self = this;

            self.$navItems.on('click', function() {

                var $curItem = $(this),
                    prevIndex = self.$_target.find('.nav.active').data('index'),
                    nextIndex = $curItem.data('index'),
                    animObj;

                animObj = {
                    start: prevIndex,
                    end: nextIndex
                }
                //Make the current nav the active one
                self.$navItems.removeClass('active');
                $curItem.addClass('active');
                self._playTransitionAnimation(prevIndex, nextIndex, animObj);
                /*window.setTimeout(function() {
                    self.$_target.find('video').attr('src', $curItem.data('video-url'));
                    self.$_target.find('.still_image').attr('src', self.aImgUrls[nextIndex]);
                }, 500);*/
            });
        },
        _playTransitionAnimation: function(start, stop, obj, func) {
            var self = this;

            $overlay = self.$_target.find('.overlay');

            if (stop > start) {
                //go forward
                start++;
            } else if (start > stop) {
                //go back
                start--;
            } else {
                //animation is done show correct video
                if (obj.start === 0) {
                    window.setTimeout(function() {
                        $overlay.css('background-image', 'url(' + self.aAnimationImgs[stop] + ')');
                        window.setTimeout(function() {
                            $overlay.css('background-image', 'url(' + self.aAnimationImgsB[stop] + ')');
                            window.setTimeout(function() {
                                $overlay.css('background-image', 'url(' + self.aAnimationImgs[stop] + ')');
                                //window.setTimeout(function() {
                                    self.$_target.find('video:visible').fadeOut();
                                    window.setTimeout(function() {
                                        self.$_target.find('video[data-index=' + stop + ']').fadeIn();
                                    }, 200);
                                //}, 200);
                            }, 500);
                        }, 500);
                    }, 700);
                } else if (stop === 0) {
                    window.setTimeout(function() {
                        $overlay.css('background-image', 'url(' + self.aAnimationImgsB[stop] + ')');
                        window.setTimeout(function() {
                            $overlay.css('background-image', 'url(' + self.aAnimationImgs[stop] + ')');
                            window.setTimeout(function() {
                                $overlay.css('background-image', 'url(' + self.aAnimationImgsB[stop] + ')');
                                //window.setTimeout(function() {
                                    self.$_target.find('video:visible').fadeOut();
                                    window.setTimeout(function() {
                                        self.$_target.find('video[data-index=' + stop + ']').fadeIn();
                                    }, 200);
                                //}, 500);
                            }, 500);
                        }, 500);
                    }, 700);
                } else {
                    window.setTimeout(function() {
                        self.$_target.find('video:visible').fadeOut();
                        window.setTimeout(function() {
                            self.$_target.find('video[data-index=' + stop + ']').fadeIn();
                        }, 200);
                    }, 700);
                }
                return;
            }
            //animate!
            window.setTimeout(function() {
                if (obj.start === 0) {
                    $overlay.css('background-image', 'url(' + self.aAnimationImgsB[start] + ')');
                } else {
                    $overlay.css('background-image', 'url(' + self.aAnimationImgs[start] + ')');
                }

                self._playTransitionAnimation(start, stop, obj, func);
            }, 1000);
        },
        _getBasePath: function() {
            var self = this, // make the component object accessible by other callbacks
            //sets the path for the server
                componentWrapper = self.$_target.parent(),
                styleTagContent = componentWrapper.find('style'),
                newPath = '';

            if (styleTagContent.length) {
                styleTagContent = styleTagContent[0].innerHTML;
                var regExp = new RegExp(/@import url(.*?);/); // match to the first css import
                styleTagContent = regExp.exec(styleTagContent)[1]; // get the first group within the match 
                styleTagContent = styleTagContent.replace(/[(|)]|'|\s/g, ''); // remove parentheses, single quotes, whitespace  

                newPath = styleTagContent.replace('css/acadia-traction.min.css', ''); // replace css path with the url
            }
            return newPath;
        }
    });

    // initialize this component
    $(document).ready(function() {
        acadiaTraction.init('#acadia-traction');
    });
})(jQuery);