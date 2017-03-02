/** MRM Worldwide
 * Author: William J Hitchcock
 * Date: 02/08/2016
 **/

// Be sure to change the name of myComponent to something else throughout this file.
var traileringGuide = traileringGuide || {};
~(function($) {
    $.extend(traileringGuide, {

        $_target: null, // the jquery object of the component // do not remove

        // initialize javascript
        init: function(selector) {
            var self = this, // make the component object accessible by other callbacks
                truckAry;
            self.$_target = $(selector);
            if (self.$_target.length > 0) {
                // if the selector/component actually exist, then continue

                //*******  Init Code Here *******//

                self.$_target.find('#welcome').show();
                //*******  End Init Code ********//

                // Call the bindings
                truckAry = self.callBindings();
            }

        },
        callBindings: function() {
            // put all event listeners/bindings here when possible
            var self = this;
            var truckAry = [{
                truck: self.$_target.find('#truck1'),
                text: self.$_target.find('#info1'),
                button: self.$_target.find('#button1'),
                navVal: "Canyon",
                btnVal: "7700 lbs max",
                url: {
                    model: "http://www.gmc.com/canyon-small-pickup-truck.html",
                    build: "http://www.gmc.com/canyon-small-pickup-truck/build-and-price.html#/config"
                }
            }, {
                truck: self.$_target.find('#truck2'),
                text: self.$_target.find('#info2'),
                button: self.$_target.find('#button2'),
                navVal: "Sierra 1500",
                btnVal: "12000 lbs max",
                url: {
                    model: "http://www.gmc.com/previous-year/sierra-1500-pickup-truck.html",
                    build: "http://www.gmc.com/previous-year/sierra-1500-pickup-truck/build-and-price.html#/config"
                }
            }, {
                truck: self.$_target.find('#truck3'),
                text: self.$_target.find('#info3'),
                button: self.$_target.find('#button3'),
                navVal: "Sierra 2500HD",
                btnVal: "14500 lbs max",
                url: {
                    model: "http://www.gmc.com/sierra-2500hd-pickup-truck.html",
                    build: "http://www.gmc.com/sierra-2500hd-pickup-truck/build-and-price.html#/config"
                }
            }, {
                truck: self.$_target.find('#truck4'),
                text: self.$_target.find('#info4'),
                button: self.$_target.find('#button4'),
                navVal: "Sierra 3500HD",
                btnVal: "1800 lbs max",
                url: {
                    model: "http://www.gmc.com/sierra-3500hd-pickup-truck.html",
                    build: "http://www.gmc.com/sierra-3500hd-pickup-truck/build-and-price.html#/config"
                }
            }, {
                truck: self.$_target.find('#truck5'),
                text: self.$_target.find('#info5'),
                button: self.$_target.find('#button5'),
                navVal: "Sierra 3500 Denali HD",
                btnVal: "23200 lbs max",
                url: {
                    model: "http://www.gmc.com/sierra-3500-denali-hd-pickup-truck.html",
                    build: "http://www.gmc.com/sierra-3500-denali-hd-pickup-truck/build-and-price.html"
                }
            }, {
                truck: self.$_target.find('#welcome, #overlay, .btnOverlay'),
                button: self.$_target.find('#reset'),
                navVal: "hide"
            }];

            for (var i = truckAry.length - 1; i >= 0; i--) {
                truckAry[i].button.bind('click', truckAry[i], function(obj) {
                    self.changeSelection(obj.data);
                });
                self.$_target.find('li[rel="' + truckAry[i].navVal + '"]')
                    .bind('click', truckAry[i], function(obj) {
                        self.changeSelection(obj.data);
                    });
            };

            self.$_target.find('.select').each(function() {
                var select = $(this);

                select.find('.select-options li').bind('click', function(e) {
                    selectStyled = select.find('.select-styled'); //Select box
                    option = $(this); //Clicked option
                    //show previously selected option
                    select.find('.select-options li[rel="' + selectStyled.attr('rel') + '"]').removeClass('hide');
                    //set rel of the select to the rel of the new option
                    selectStyled.attr('rel', option.attr('rel'));
                    //hide newly selected option
                    option.addClass('hide');
                    //set text of select to reflect new option
                    selectStyled.text(option.text());
                    //hide options
                    select.find('.select-options:visible').hide();
                });

                select.find('.select-styled').bind('click', function(e) {
                    e.stopPropagation();
                    select.find('.select-options').toggle();
                    if (select.find('.select-options:visible').length > 0)
                        $(this).addClass('active');
                    else
                        $(this).removeClass('active');
                });

                $(document).bind('click', function(e) {
                    e.stopPropagation();
                    select.find('.select-options:visible').hide();
                });
            });
            return truckAry;
        },
        changeSelection: function(obj) {
            var self = this;
            select = self.$_target.find('#truckSelect');
            selectStyled = select.find('.select-styled');
            option = select.find('li[rel="' + obj.navVal + '"]');

            //fade out overlay if visible
            self.$_target.find('#overlay:visible').fadeOut();
            //inactivate previous button
            self.$_target.find('.rightBtn.active').removeClass('active');
            //unhide previous select option
            if (selectStyled.attr('rel'))
                select.find('.select-options li[rel="' + selectStyled.attr('rel') + '"]').removeClass('hide');
            //set rel of the select to the new option
            selectStyled.attr('rel', obj.navVal);
            //hide new select option
            option.addClass('hide');

            //set text of select box
            selectStyled.text(option.text());
            if (obj.button) {
                $(obj.button).addClass('active');
            }
            self.$_target.find('.details:visible').hide();
            if (obj.text) {
                obj.text.show()
            }
            if (obj.navVal) {
                self.$_target.find('#nav select').val(obj.navVal);
            }
            self.$_target.find('.truck:visible').fadeOut(400, function() {

                if (obj.truck) {
                    obj.truck.fadeIn();
                }

            });
        },
        indexOfProp: function(ary, prop, val) {
            for (var i = ary.length - 1; i >= 0; i--) {
                if (ary[i][prop] == val)
                    return i;
            };
        },
        initSelect: function() {
            var self = this;
        }
    });

    // initialize this component
    $(document).ready(function() {
        traileringGuide.init('#traileringGuide');
    });
})(jQuery);