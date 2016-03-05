angular.module('expenseTracker').factory('utilityService',function() {
var id = 0;
return{

    guid: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },

   propComparator:function (prop){
        return function(a, b) {
            return a[prop] - b[prop];
        };
    },

    };


});
