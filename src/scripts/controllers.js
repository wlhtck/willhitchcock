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
        dirtyFixDone = false;
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

            //extremely dirty fix
            if ($index === 0 && !dirtyFixDone) {
                dirtyFixDone = true;
                window.setTimeout(function() {
                    eval($scope.portfolio.items[$index].init);
                }, 20);
            }
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