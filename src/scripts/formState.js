angular.module('formState', [])

.directive('formState', function() {

  function link(scope, element, attrs) {
  	var fields = element.find('textarea, input')
  	var $      = angular.element
  	
    fields.on('focus', function(){
    	$(this).parent().find('label').addClass('active');
    })

    fields.on('focusout', function(){
    	console.log($(this))
    	if ($(this).hasClass('ng-empty'))
    		$(this).parent().find('label').removeClass('active');
    	
    })
  }

  return {
    link: link
  };
});