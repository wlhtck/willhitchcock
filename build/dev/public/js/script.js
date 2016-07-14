var williamJHitchcock = angular.module('williamJHitchcock', ['ngRoute', 'pageCtrl']);

williamJHitchcock.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/resume', {
			templateUrl: 'partials/resume.html',
			controller: 'ResumeCtrl'
		})
		.when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: 'ContactCtrl'
		})
		.when('/portfolio', {
			templateUrl: 'partials/portfolio.html',
			controller: 'PortfolioCtrl'
		})
		.when('/', {
			templateUrl: 'partials/about.html',
			controller: 'AboutCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
var pageCtrls = angular.module('pageCtrl', ['ngRoute', 'ngAnimate', 'slickCarousel', 'angular-inview', 'slideAnimate']);

pageCtrls
    .controller('HeadCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/head.json').success(function(data) {
            $scope.head = data;
        });


    }])
    .controller('HeaderCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/header.json').success(function(data) {
            $scope.header = data;
        });

        $scope.stick = function($inview) {
            $scope.sticky = !$inview;
        }

        $scope.updateSelected = function(i) {
            $scope.selectedIndex = i;
        }
    }])
    .controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/about.json').success(function(data) {
            $scope.about = data;
        });
    }])
    .controller('ResumeCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/resume.json').success(function(data) {
            $scope.resume = data;
        });
    }])
    .controller('PortfolioCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.slickConfig = {
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }],
            enabled: false,
            prevArrow: '<i class="material-icons carousel-arrow prev">chevron_left</i>',
            nextArrow: '<i class="material-icons carousel-arrow next">chevron_right</i>'
        }

        $scope.showContent = function($index) {
            $scope.selected = $index;
        }

        $scope.hideContent = function() {
            $scope.selected = -1;
        }

        $http.get('json/portfolio.json').success(function(data) {
            $scope.portfolio = data;
            $scope.slickConfig.enabled = true;
        });
    }])
    .controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/contact.json').success(function(data) {
            $scope.contact = data;
        });

        $scope.sendEmail = function() {
            $http.get('contact' +
                    '?name=' + $scope.msg.name +
                    '&email=' + $scope.msg.email +
                    '&sub=' + $scope.msg.subject +
                    '&msg=' + $scope.msg.message)
                .success(function(data) {
                    $scope.response = data;
                });
        };
    }])
    .controller('FooterCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.date = new Date();
        $http.get('json/footer.json').success(function(data) {
            $scope.footer = data;
        });
    }]);
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