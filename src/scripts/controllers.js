var pageCtrls = angular.module('pageCtrl', ['ngRoute', 'ngAnimate', 'angular-inview']);

pageCtrls
    .controller('HeadCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/head.json').success(function(data) {
            $scope.head = data;
        });


    }])
    .controller('HeaderCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $http.get('json/header.json').success(function(data) {
            $scope.header = data;
        });

        $scope.curPage = '#' + $location.url();

        $scope.$on('$locationChangeSuccess', function() {
            $scope.curPage = '#' + $location.url();
        });

        $scope.stick = function($inview) {
            $scope.sticky = !$inview;
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
    .controller('PortfolioCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
        var w = angular.element($window);

        $scope.$watch(
            function() {
                return $window.innerWidth;
            },
            function(value) {
                $scope.windowWidth = value;
            },
            true
        );

        w.bind('resize', function() {
            $scope.$apply();
        });

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
                    slidesToScroll: 1,
                    centerMode: false,
                    arrows: false,
                    draggable: true
                }
            }],
            enabled: false,
            prevArrow: '<a class="btn-floating btn-large waves-effect teal carousel-arrow prev hoverable"><i class="material-icons">chevron_left</i></a>',
            nextArrow: '<a class="btn-floating btn-large waves-effect teal carousel-arrow next hoverable"><i class="material-icons">chevron_right</i></a>'
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

        $('.contact .relative').css('min-height', $('.form-block:visible').outerHeight(true));

        $('#message').bind('keyup', function() {
            $('.contact .relative').css('min-height', $('.form-block:visible').outerHeight(true));
        });

        $(window).resize(function() {
            $('.contact .relative').css('min-height', $('.form-block:visible').outerHeight(true));
        });

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