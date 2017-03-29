/** MRM Worldwide
 * Author: W.Hitchcock
 * Date: 1/16/2016
 **/
// Be sure to change the name of myComponent to something else throughout this file.
var terrainExterior = terrainExterior || {};
~(function($) {
    $.extend(terrainExterior, {

        $_target: null, // the jquery object of the component // do not remove
        self: null,
        base: null,

        // initialize javascript
        init: function(selector) {
            var self = this; // make the component object accessible by other callbacks
            self.$_target = $(selector);
            if (self.$_target.length > 0) {
                var w1 = self.$_target.width(); //height of rectangle

                self.slider1 = new Dragdealer('slider-handle1', {
                    x: 0.25,
                    animationCallback: function(x, y) {
                        if (self.slider2 && self.slider2.getValue()[0] < x && self.slider1.user)
                            self.slider2.setValue(x, 0, true);
                        var padding = ((x - 0.5) / 0.5) * -19.5;
                        var val = (x * w1) + padding;
                        $('#slide1').css('width', val + 'px');
                    },
                    dragStartCallback: function(x, y) {
                        self.slider1.user = true;
                    },
                    callback: function(x, y) {
                        self.checkSliderPositions();
                        self.slider1.user = false;
                    }
                });
                self.slider1.user = false;

                self.slider2 = new Dragdealer('slider-handle2', {
                    x: 0.75,
                    animationCallback: function(x, y) {
                        if (self.slider1 && self.slider1.getValue()[0] > x && self.slider2.user)
                            self.slider1.setValue(x, 0, true);
                        var padding = ((x - 0.5) / 0.5) * -19.5;
                        var val = (x * w1) + padding;
                        $('#slide2').css('width', val + 'px');
                    },
                    dragStartCallback: function(x, y) {
                        self.slider2.user = true;
                    },
                    callback: function(x, y) {
                        self.checkSliderPositions();
                        self.slider2.user = false;
                    }
                });
                self.slider2.user = false;

                self.callBindings();
            }
        },
        callBindings: function() {
            var self = this;
            self.$_target.find('#nav1').bind('click', function() {
                if (self.slider1)
                    self.slider1.setValue(1, 0);
                if (self.slider2)
                    self.slider2.setValue(1, 0);
            });
            self.$_target.find('#nav2').bind('click', function() {
                if (self.slider1)
                    self.slider1.setValue(0, 0);
                if (self.slider2)
                    self.slider2.setValue(1, 0);
            });
            self.$_target.find('#nav3').bind('click', function() {
                if (self.slider2)
                    self.slider2.setValue(0, 0);
                if (self.slider1)
                    self.slider1.setValue(0, 0);
            });
        },
        checkSliderPositions: function() {
            var self = this;
            self.$_target.find('.nav').removeClass('active')
            if (self.slider1.getValue()[0] > .5)
                self.$_target.find('#nav1').addClass('active')
            else if (self.slider2.getValue()[0] < .5)
                self.$_target.find('#nav3').addClass('active')
            else
                self.$_target.find('#nav2').addClass('active')
        }
    });

    // initialize this component
    $(document).ready(function() {
        terrainExterior.init('#terrain-exterior-clipped');
    });
})(jQuery);