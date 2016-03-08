angular.module('expenseTracker').directive('messageLabel', function() {
	return {
		restrict: 'A',
        require:'addPaymentBtn',

		link: function(scope, element, attrs,controller) {

            scope.$watch(function() {
                scope.message = controller.getMessage();

            });


		}
	};
});
