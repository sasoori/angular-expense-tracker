angular.module('expenseTracker').controller('HomeCtrl',function($scope, friendService){


    // ON state load

    // Reset values
    friendService.resetValues(function(){
        // Loop trough payment list
        friendService.checkPaymentList(function(){
             // Update UI
            $scope.friends = friendService.checkState();

        });

    });
});
