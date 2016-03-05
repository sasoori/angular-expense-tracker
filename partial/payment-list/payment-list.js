angular.module('expenseTracker').controller('PaymentListCtrl',function($scope,friendService){

    $scope.payment = friendService.modelPaymentList.payment;

});
