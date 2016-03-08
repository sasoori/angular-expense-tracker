angular.module('expenseTracker', ['ui.bootstrap','ui.utils','ui.router','ngMaterial', 'ngAnimate', 'ngMessages']);

angular.module('expenseTracker').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html',
        controller: 'HomeCtrl'
    });
    $stateProvider.state('add-payment', {
        url: '/add-payment',
        templateUrl: 'partial/add-payment/add-payment.html',
        controller:'AddPaymentCtrl',
        params: {
            payerID: null,

        }
    });
    $stateProvider.state('payment-list', {
        url: '/payment-list',
        templateUrl: 'partial/payment-list/payment-list.html',
        controller:'PaymentListCtrl'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('expenseTracker').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
