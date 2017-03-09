var pageCtrls = angular.module('pageCtrl', ['ngRoute', 'angular-inview', 'ngAnimate', 'smoothScroll']);

pageCtrls
    .controller('HeadCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/head.json').then(function(resp) {
            $scope.head = resp.data;
        });


    }])
    .controller('HeaderCtrl', ['$scope', '$http', '$location', 'smoothScroll', function($scope, $http, $location, smoothScroll) {
        $http.get('json/header.json').then(function(resp) {
            $scope.header = resp.data;
        });
        // $anchorScroll.yOffset = 64; 
        $scope.curPage = '#!' + $location.url();

        $scope.$on('$locationChangeSuccess', function() {
            $scope.curPage = '#!' + $location.url();
            smoothScroll(document.getElementById('page-content'), {offset: 64});
        });

        $scope.stick = function($inview) {
            $scope.sticky = !$inview;
        }
    }])
    .controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/about.json').then(function(resp) {
            $scope.about = resp.data;
        });
    }])
    .controller('ResumeCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/resume.json').then(function(resp) {
            $scope.resume = resp.data;
        });
    }])
    .controller('PortfolioCtrl', ['$scope', '$http', '$window', '$rootScope', function($scope, $http, $window, $rootScope) {
        var w = angular.element($window);
        
        $scope.visible = 8;

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

        $scope.showContent = function($index) {
            $scope.selected = $index;
            $rootScope.noScroll = 'no-scroll';
        }

        $scope.hideContent = function() {
            $scope.selected = -1;
            $rootScope.noScroll = '';
        }

        $scope.showMore = function() {
            $scope.visible += 8;
        }

        $scope.showAll = function() {
            $scope.visible = $scope.portfolio.portfolio.items.length;
        }

        $http.get('json/portfolio.json').then(function(resp) {
            $scope.portfolio = resp.data;
        });


    }])
    .controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {

        $http.get('json/contact.json').then(function(resp) {
            $scope.contact = resp.data;
        });

        $scope.sendEmail = function() {
            $http.get('contact' +
                    '?name=' + $scope.msg.name +
                    '&email=' + $scope.msg.email +
                    '&sub=' + $scope.msg.subject +
                    '&msg=' + $scope.msg.message)
                .then(function(resp) {
                    $scope.response = resp.data;
                });
        };
    }])
    .controller('FooterCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.date = new Date();
        $http.get('json/footer.json').then(function(resp) {
            $scope.footer = resp.data;
        });
    }]);