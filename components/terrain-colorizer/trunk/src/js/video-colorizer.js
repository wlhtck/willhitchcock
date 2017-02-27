/** MRM Worldwide
  * Author: W. Hitchcock
  * Date: 11/14/2016
  **/
  
// Be sure to change the name of videoColorizer to something else throughout this file.
var videoColorizer = videoColorizer || {};
~ (function ($) {       
    $.extend( videoColorizer, {
        $_target:null, // the jquery object of the component // do not remove
        $_draggable:null,
        $_activeVideo:null,
        $_nextVideo:null,
        
        $_activeCarousel:null,
        $_nextCarousel:null,
        
        $_videos:null,
        debounce:true,
        intAnimActive:false,
        extAnimActive:false,
        innerTimer: null,
        outerTimer: null,
        // shouldn't be hardcoded, failing to get the correct value from video.duration on document ready
        videoLength: 7,
        curTime: 0,
        numOfAngles:4,
        curAngle: 0,
        // initialize javascript
        init:function(selector) {
            var self = this;  // make the component object accessible by other callbacks
            self.$_target = $(selector);
            self.$_activeVideo = self.$_target.find('.video_player.active');
            self.$_activeCarousel = self.$_target.find('.carousel-custom.active');
            self.$_videos = self.$_target.find('.video_player');

            if (self.$_target.length > 0) {
                
                // if the selector/component actually exist, then continue
                
                //*******  Init Code Here *******//

                self.$_draggable = $('.dragable').draggabilly({
                  // options...
                  containment:true
                });

                self.$_target.find('.carousel-custom').slick({
                        prevArrow: '<span class="mmScrollBtn prev"></span>',
                        nextArrow: '<span class="mmScrollBtn next"></span>'
                });
                
                //*******  End Init Code ********//
                
                // Call the bindings
                self.callBindings();
            }
            
        },
        callBindings:function() {
            // put all event listeners/bindings here when possible
            var self = this;

            /*self.$_target.waypoint({
              handler: function(direction) {
                console.log('hello!');
                self.$_activeVideo[0].play();
                this.destroy();
              },
              offset: '80%'
            });*/

            self.$_target.find('.carousel-custom').on('afterChange', function(e, slick, curSlide){
              self.$_target.find('.carousel-custom:not(.active)').slick('goTo', curSlide);
            });

            self.$_target.find('.tool-tip').on('click', function(e){
                e.stopPropagation();
            });

            self.$_target.find('.exterior').on('click', function() {
                $(this).addClass('active');
                
                self.$_target.find('.interior').removeClass('active');

                self.$_target.find('.video-container, .video-container .mmScrollBtn, .ext-colors').removeClass('hide-custom');
                self.$_target.find('.int-colors').addClass('hide-custom');
                self.$_target.find('.carousel-container').addClass('hide-custom');
            });

            self.$_target.find('.interior').on('click', function() {
                self.$_target.find('.exterior').removeClass('active');
                $(this).addClass('active');
                self.$_target.find('.video-container, .video-container .mmScrollBtn, .ext-colors').addClass('hide-custom');
                self.$_target.find('.int-colors').removeClass('hide-custom');
                self.$_target.find('.carousel-container').removeClass('hide-custom');
            });

            self.$_target.find('.ext-colors .color-chip').on('click', function() {
                //stop if this chip is already active
                if ($(this).hasClass('active')){
                    return;
                }

                if (self.extAnimActive) {
                    //stop current animation before proceeding wtih new animation

                    //clear previous set timers
                    window.clearTimeout(self.innerTimer);
                    window.clearTimeout(self.outerTimer);

                    if (self.$_nextVideo !== null) {
                        
                        self.$_activeVideo.removeClass('active');
                        self.$_activeVideo = self.$_nextVideo;

                        self.innerTimer = window.setTimeout(function(){
                            //remove inline styles from any video players that have them
                            self.$_target.find('.video_player[style]').removeAttr('style');
                            self.extAnimActive = false;
                        }, 500);
                    } else {
                        self.$_activeVideo.removeAttr('style');
                        self.extAnimActive = false;
                    }

                }
                //set animation flag
                self.extAnimActive = true;

                //set next video el
                self.$_nextVideo = self.$_target.find('.video_player[data-index=' + $(this).data('index') + ']');

                //set the clicked chip to active
                self.$_target.find('.ext-colors .color-chip.active').removeClass('active');
                $(this).addClass('active');

                //put next video on top and make it active
                self.$_nextVideo
                    .css('z-index', 2)
                    .addClass('active');
                
                //set timers to handle the remaining animation
                self.outerTimer = window.setTimeout(function(){
                    //make next video active
                    self.$_activeVideo.removeClass('active');
                    self.$_activeVideo = self.$_nextVideo;
                    self.$_nextVideo = null;
                    
                    self.innerTimer = window.setTimeout(function(){
                        //remove z-index from active video
                        self.$_activeVideo.removeAttr('style');
                        //animation complete, reset flag
                        self.extAnimActive = false;
                    }, 500);
                }, 500);
                
                
                

            });

            self.$_target.find('.int-colors .color-chip').on('click', function() {
                //stop if this chip is already active
                if ($(this).hasClass('active')){
                    return;
                }

                if (self.intAnimActive) {
                    //stop current animation before proceeding wtih new animation

                    //clear previous set timers
                    window.clearTimeout(self.innerTimer);
                    window.clearTimeout(self.outerTimer);

                    if (self.$_nextCarousel !== null) {
                        
                        self.$_activeCarousel.removeClass('active');
                        self.$_activeCarousel = self.$_nextCarousel;

                        self.innerTimer = window.setTimeout(function(){
                            //remove inline styles from any carousels that have them
                            self.$_target.find('.carousel-custom[style]').removeAttr('style');
                            self.intAnimActive = false;
                        }, 500);
                    } else {
                        self.$_activeCarousel.removeAttr('style');
                        self.intAnimActive = false;
                    }
                }

                //set animation flag
                self.intAnimActive = true;

                //set next carousel el
                self.$_nextCarousel = self.$_target.find('.carousel-custom[data-index=' + $(this).data('index') + ']');

                //set the clicked chip to active
                self.$_target.find('.int-colors .color-chip.active').removeClass('active');
                $(this).addClass('active');
                
                //put next carousel on top and make it active
                self.$_nextCarousel
                    .css('z-index', 2)
                    .addClass('active');

                //set timers to handle the remaining animation
                self.outerTimer = window.setTimeout(function(){
                    //make the next carousel active
                    self.$_activeCarousel.removeClass('active');
                    self.$_activeCarousel = self.$_nextCarousel;
                    self.$_nextCarousel = null;
                    
                    self.innerTimer = window.setTimeout(function(){
                        //remove z-index from active carousel
                        self.$_activeCarousel.removeAttr('style');
                        //animation complete, reset flag
                        self.intAnimActive = false;
                    }, 500);
                }, 500);
                

            });

            self.$_target.find('.video-container .next').on('click', function() {

                
                self.curTime -= .78;

                if(self.curTime < .75) {
                    self.curTime = self.videoLength - 1.56;
                }


                self.$_activeVideo[0].currentTime = self.curTime;
                self.$_activeVideo[0].pause();

                self.$_videos.each(function(){
                    this.currentTime = self.curTime;
                });

                /*self.curAngle--;
                if(self.curAngle < 0) {

                    //go to end of video to avoid scrubbing through entire video
                    self.curTime = self.videoLength;
                    self.curAngle = self.numOfAngles-1;
                    
                }

                self.goToAngle(self.curAngle);*/
            });

            self.$_target.find('.video-container .prev').on('click', function() {
                self.curTime += .78;

                if(self.curTime > 5.5) {
                    self.curTime = .78;
                } else if (self.curTime <= .78) {
                    self.curTime = 1.56;
                }

                self.$_activeVideo[0].currentTime = self.curTime;
                self.$_activeVideo[0].pause();

                self.$_videos.each(function(){
                    this.currentTime = self.curTime;
                });

                /*self.curAngle++;
                if(self.curAngle > self.numOfAngles) {

                    //go to beginning of video to avoid scrubbing through entire video
                    self.curTime = 0;
                    self.curAngle = 0;
                }

                self.goToAngle(self.curAngle);*/
            });

            /*self.$_target.find('.video_player.active').on('ended', function(){
                self.$_target.find('.colors, .mmScrollBtn, .nav').removeClass('hide-custom');
                self.$_draggable.css('z-index', 1);
                //check this later as it may be a better ie fix
                //this.pause();
                $(this).off('ended');
            });*/
            
            //keep track of previous x position of drag vector, this is necessary to calculate rate of change
            var x = 0;

            self.$_draggable.on('pointerDown', function( event, pointer ) {
                //set previous x back to 0 for new drag event
                x = 0;
            });

            self.$_draggable.on('pointerMove', function(e, pointer, moveVector){
                self.$_activeVideo.each(function(){
                    var video = this;
                    if(self.debounce) {
                        self.debounce = false;

                        //calculate rate of change, increasing constant will slow drag interaction
                        self.curTime += ((x - moveVector.x) / 150);

                        x = moveVector.x;

                        if(self.curTime > self.videoLength) {
                            self.curTime -= self.videoLength;
                        } else if (self.curTime < 0) {
                            self.curTime += self.videoLength;
                        }

                        //should not exceed self.videoLength (5), should never be negative
                        self.$_activeVideo[0].currentTime = self.curTime;
                        self.$_activeVideo[0].pause();



                        window.setTimeout(function(){
                            self.debounce = true;
                        }, 75);
                    }
                });
            });

            self.$_draggable.on('pointerUp', function(){
                //set all videos to the same time index at the end of drag event
                self.$_videos.each(function(){
                    this.currentTime = self.curTime;
                });
            });
        },
        goToAngle: function(i) {
            var self = this,
                endTime = self.videoLength * (i/self.numOfAngles),
                debounce = true,
                interval;
                
            if (self.curTime > endTime) {
                interval = window.setInterval(function(){

                    self.curTime -= .1;
                    self.$_activeVideo[0].currentTime = self.curTime;
                    self.$_activeVideo[0].pause();
                    if (self.curTime<=endTime) {
                        self.$_videos.each(function(){
                            this.currentTime = self.curTime;
                        });
                        clearInterval(interval);
                    }

                },75);
            } else if (self.curTime < endTime) {
                interval = window.setInterval(function(){

                    self.curTime += .1;
                    self.$_activeVideo[0].currentTime = self.curTime;
                    self.$_activeVideo[0].pause();
                    if (self.curTime>=endTime) {
                        self.$_videos.each(function(){
                            this.currentTime = self.curTime;
                        });
                        clearInterval(interval);
                    }
                    
                },75);
            }
        }
    });
    
    // initialize this component
    $(document).ready(function() {
        videoColorizer.init('#video-colorizer');
    });
})(jQuery);