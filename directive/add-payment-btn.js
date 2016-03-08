angular.module('expenseTracker').directive('addPaymentBtn', function(friendService, $state) {
	return {
		restrict: 'A',
        controller: function($scope,$element,$attrs){

             $scope.message= '';
             $scope.consumersList = friendService.model.friendList;

             this.getMessage = function(){
                 return $scope.message;

             };


        },
        link: function(scope, element, attrs, fn) {

            // Add payment button click event
             element.bind('click',function(){

                    // Reset message
                     scope.message = "";


                    // Define a flag
                    var negative = false;


                    // Loop trough user inputs and find invalid input
                    angular.forEach(scope.consumersList, function(consumer) {

                         if(consumer.amount === null ||consumer.amount === undefined){
                             // Incorrect input found, turn flag to true
                            negative = true;

                         }

                     });

                     // Check if payer is selected
                     if (scope.payment.friend.id === null || scope.payment.friend.id === undefined) {

                            scope.message = "Please select payer.";

                     // Check if flag is true and check if total sum is zero
                     }else if (negative === true || scope.getTotal() === 0) {

                          scope.message = "Please enter numbers larger than zero.";

                     }else {

                         // Everything went fine, add payment to payment list
                         friendService.addPaymentToPaymentList(scope.payment.friend.id, scope.getTotal(), scope.consumersList);
                         // Return to home state
                         $state.go('home');
                }

             });


        }
	};
});
