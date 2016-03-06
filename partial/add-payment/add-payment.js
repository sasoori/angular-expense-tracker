angular.module('expenseTracker').controller('AddPaymentCtrl',function($scope, $state,$stateParams, friendService){

    $scope.payment = {};
    $scope.payment.friend = friendService.getFriendByID($stateParams.payerID);


    $scope.$watch('payment.friend', function(){
        $scope.change()
    });

    $scope.friends = friendService.model.friendList;

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

    $scope.getTotal = function(){
        var total = 0;
        angular.forEach($scope.consumersList, function(friend) {

            if (friend.amount != null) {
                total += friend.amount;
            }

        });
        return total;
    };

    $scope.addPayment = function(){

        // params :  payerID, total, consumersList
        friendService.addPaymentToPaymentList($scope.payment.friend.id, $scope.getTotal(), $scope.consumersList);
        $state.go('home');

    };



});
