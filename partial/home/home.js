angular.module('expenseTracker').controller('HomeCtrl',function($scope, friendService){




    friendService.resetValues(function(){

        friendService.getTotalPayment(function(){

            $scope.friends = friendService.getDebt();

        });

    });
});
