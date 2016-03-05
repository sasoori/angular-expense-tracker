describe('AddPaymentCtrl', function() {

	beforeEach(module('expenseTracker'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('AddPaymentCtrl', {$scope: scope});
    }));

	it('should ...', inject(function() {

		expect(1).toEqual(1);

	}));

});
