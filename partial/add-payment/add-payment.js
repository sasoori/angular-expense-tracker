angular.module('expenseTracker').controller('AddPaymentCtrl',function($scope, $state,$stateParams, friendService){

    $scope.payment = {};
    $scope.payment.friend = friendService.getFriendByID($stateParams.payerID);


    // Watch payment.friend value for changes, if there is one, trigger change() function to update UI
    $scope.$watch('payment.friend', function(){
        $scope.change();
    });

    $scope.friends = friendService.model.friendList;


    // Triggered when user changes payer in select control
    $scope.change = function(){

        $scope.consumersList =[
            {
                id:1,
                name:'Luka'
            },
            {
                id:2,
                name:'Saso'

            },
            {
                id:3,
                name:'Urban'
            }
            ];

    };

    // Calculates total sum of the payment
    $scope.getTotal = function(){
        var total = 0;
        angular.forEach($scope.consumersList, function(consumer) {

            if (consumer.amount != null) {
                total += consumer.amount;
            }

        });
        return total;
    };


});
