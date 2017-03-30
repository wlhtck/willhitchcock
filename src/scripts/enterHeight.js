angular.module('enterHeight', [])

//set the height of the target element to the height of its child .ng-enter
//useful for animations that require position absolute during the animation

.directive('enterHeight', ['$interval', function($interval) {

  function link(scope, element, attrs) {

    scope.$watch(attrs.enterHeight, function(value) {
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    
    //TODO: Add debounce logic to this to prevent this event firing many times per animation sequence
    timeoutId = $interval(function() {
      var height = 0;
      var children = element.children()

      for (var i = children.length - 1; i >= 0; i--) {
        if(angular.element(children[i]).hasClass('ng-enter')) {
          height = children[i].offsetHeight
          element.css('min-height', height + 'px');
        }
      }
    }, 100);
  }

  return {
    link: link
  };
}]);