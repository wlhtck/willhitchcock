angular.module('cardToggle', [])

.directive('cardToggle', function() {

  function link(scope, element, attrs) {
    element.on('click', function(e){
    	if(angular.element(e.target).hasClass('activator'))
    		element.toggleClass('active');
    })
  }

  return {
    link: link
  };
});