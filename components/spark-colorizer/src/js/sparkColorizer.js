/** MRM Worldwide
 * Author: William J Hitchcock
 * Date: 10/15/2015
 **/

// Be sure to change the name of myComponent to something else throughout this file.
var sparkColorizer = sparkColorizer || {};
(function($) {

    $.extend(sparkColorizer, {
        sExampleVariable: 'My String',
        bExampleBool: true,
        iExampleInt: 1,
        $_target: null, // the jquery object of the component // do not remove

        // initialize javascript
        init: function(selector) {
            var self = this; // make the component object accessible by other callbacks
            self.$_target = $(selector);
            if (self.$_target.length > 0) {
                // if the selector/component actually exist, then continue

                //*******  Init Code Here *******//


                function preload() {
                    var images = new Array()
                    for (i = 0; i < preload.arguments.length; i++) {
                        images[i] = new Image()
                        images[i].src = preload.arguments[i]
                    }
                }
                preload(
                    "components/spark-colorizer/img/2016-chevrolet-spark-black-granite-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-electric-blue-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-kalamata-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-salsa-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-silver-ice-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-splash-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-summit-white-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-titanium-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-toasted-marshmallow-compact-car-mo-design.jpg",
                    "components/spark-colorizer/img/2016-chevrolet-spark-lime-compact-car-mo-design.jpg",
                    'components/spark-colorizer/img/black-granite-sm.jpg',
                    'components/spark-colorizer/img/black-granite.jpg',
                    'components/spark-colorizer/img/lime-tag.jpg',
                    'components/spark-colorizer/img/electric-blue-sm.jpg',
                    'components/spark-colorizer/img/electric-blue.jpg',
                    'components/spark-colorizer/img/black-granite-tag.jpg',
                    'components/spark-colorizer/img/kalamata-sm.jpg',
                    'components/spark-colorizer/img/kalamata.jpg',
                    'components/spark-colorizer/img/toasted-marshmallow-tag.jpg',
                    'components/spark-colorizer/img/lime-sm.jpg',
                    'components/spark-colorizer/img/lime.jpg',
                    'components/spark-colorizer/img/electric-blue-tag.jpg',
                    'components/spark-colorizer/img/salsa-sm.jpg',
                    'components/spark-colorizer/img/salsa.jpg',
                    'components/spark-colorizer/img/kalamata-tag.jpg',
                    'components/spark-colorizer/img/silver-ice-sm.jpg',
                    'components/spark-colorizer/img/silver-ice.jpg',
                    'components/spark-colorizer/img/summit-white-tag.jpg',
                    'components/spark-colorizer/img/splash-sm.jpg',
                    'components/spark-colorizer/img/splash.jpg',
                    'components/spark-colorizer/img/splash-tag.jpg',
                    'components/spark-colorizer/img/summit-white-sm.jpg',
                    'components/spark-colorizer/img/summit-white.jpg',
                    'components/spark-colorizer/img/silver-ice-tag.jpg',
                    'components/spark-colorizer/img/titanium-sm.jpg',
                    'components/spark-colorizer/img/titanium.jpg',
                    'components/spark-colorizer/img/titanium-tag.jpg',
                    'components/spark-colorizer/img/toasted-marshmallow-sm.jpg',
                    'components/spark-colorizer/img/toasted-marshmallow.jpg',
                    'components/spark-colorizer/img/salsa-tag.jpg'
                )

                //*******  End Init Code ********//

                // Call the bindings
                self.callBindings();

                // do something
            }

        },
        callBindings: function() {
            // put all event listeners/bindings here when possible
            var self = this;
            self.$_target.find('.nav-button').bind('click', function() {
                $('.nav-button').closest('.nav-item').removeClass('active');
                $(this).closest('.nav-item').addClass('active');
            });

            self.$_target.find('#black-granite .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-black-granite-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#electric-blue .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-electric-blue-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#kalamata .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-kalamata-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#lime .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-lime-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#salsa .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-salsa-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#silver-ice .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-silver-ice-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#splash .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-splash-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#summit-white .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-summit-white-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#titanium .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-titanium-compact-car-mo-design.jpg")');
            });
            self.$_target.find('#toasted-marshmallow .nav-button').bind('click', function() {
                self.$_target.find('#chevrolet-spark').css('background-image', 'url("components/spark-colorizer/img/2016-chevrolet-spark-toasted-marshmallow-compact-car-mo-design.jpg")');
            });
        }
    });

    // initialize this component
    $(document).ready(function() {
        sparkColorizer.init('#sparkColorizer');
    });

})(jQuery);