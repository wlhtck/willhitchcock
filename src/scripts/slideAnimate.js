var slideAnimate = angular.module('slideAnimate', [])
    .directive('slideAnimate', ['$timeout',function($timeout) {
        function link(scope, $el, attrs) {
            var $parent = $el.parent(),
                $chld = $el.children(),
                curIndex,
                $curEl = angular.element($chld[curIndex]),
                position = 0;




            function init() {
                $parent.css({
                    'overflow': 'hidden',
                    'height': $curEl.height() + 20
                });
                $el.css({
                    'position': 'relative',
                    'top': position
                });
            }

            function animate(dir) {
                if (dir === 'up') {
                    position = position - $curEl.height() - 20;
                    $el.css('top', position);
                } else {
                    position = position + $curEl.height() + 20;
                    $el.css('top', position);
                }
            }

            scope.$watch(attrs.slideAnimate, function(value) {
                if (curIndex === undefined) {
                    curIndex = value;
                    $curEl = angular.element($chld[curIndex]);
                    init();
                }
                while (value < curIndex) {

                        animate('down');
                        curIndex--;
                        $curEl = angular.element($chld[curIndex]);
                        $parent.height($curEl.height() + 20);
                }

                while (value > curIndex) {
                        animate('up');
                        curIndex++;
                        $curEl = angular.element($chld[curIndex]);
                        $parent.height($curEl.height() + 20);
                }
            });
        }

        return {
            link: link
        };
    }]);