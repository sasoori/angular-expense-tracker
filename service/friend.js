angular.module('expenseTracker').factory('friendService',function(utilityService) {

    // Friend list model, containing friend name and friend ID
    var service = {

        model:{
            friendList:[
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
            ]
        },

        // Payment list model, holding information about each payment
        modelPaymentList : {
             payment:[

            ]
        },


        getFriendByID: function(id) {
            var rFriend = {};

            // Loop trough friends list. On match return friend object
            angular.forEach(service.model.friendList, function (friend) {

                if (friend.id === id) {
                    rFriend = friend;
                }

            });

            return rFriend;
        },

        resetValues: function(cb){

            // Prevents values from doubling on each page refresh by resetting them
            angular.forEach(service.model.friendList, function (friend, index) {

                service.model.friendList[index].totalPayment = 0;
                service.model.friendList[index].totalDebt = 0;
                service.model.friendList[index].currentState = 0;

            });

            // Execute callback function
            cb();
        },

        addPaymentToPaymentList: function(payerID, total, consumersList){


            // Compile message which is displayed on payment list
            var compiledMessage = service.getFriendByID(payerID).name + ' payed $' + total + ' for';

            angular.forEach(consumersList, function(friend, i){

                        if (i === consumersList.length - 1){

                            compiledMessage = compiledMessage + ' ' + friend.name + '($' + friend.amount + ')';
                        }else{

                            compiledMessage = compiledMessage + ' ' + friend.name + '($' + friend.amount+ '),';
                        }

            });

            // Create new payment object in payment list with provided data
            service.modelPaymentList.payment.push({

                id: utilityService.guid(),
                date: moment().format('LLL'), // Moment.js library returns local time in readable format
                message:compiledMessage,
                paymentInfo:
                 {
                    total: total,
                    payerID: payerID,
                    consumersList:consumersList
                 }
            });

         },

        addTotalPayment: function(id, amount){

            // Increase total payment value by amount that payer payed
            angular.forEach(service.model.friendList, function (friend, index) {

                if (friend.id === id) {

                    service.model.friendList[index].totalPayment += amount;

                }
            });
        },

        addTotalDebt: function(id, amount){

            // Increase total debt value by amount that friend spend
            angular.forEach(service.model.friendList, function (friend, index) {

                if (friend.id === id) {

                    service.model.friendList[index].totalDebt += amount;

                }

            });

        },

        checkPaymentList: function(cb){

            // Loop through paymentList for payments
            angular.forEach(service.modelPaymentList.payment, function(paymentList) {

                    // Add payment to payer
                    service.addTotalPayment(paymentList.paymentInfo.payerID, paymentList.paymentInfo.total);


                    angular.forEach(paymentList.paymentInfo.consumersList, function(consumer) {

                        // Add debt to spender
                        service.addTotalDebt(consumer.id, consumer.amount);

                    });
             });
            // Execute callback function
            cb();
        },

        checkState: function(){

            // Declare temp array
            var friendsArray = service.model.friendList.slice();

            // Calculate current state of each friend
            angular.forEach(service.model.friendList, function(friend, index){

                    friendsArray[index].currentState =  friend.totalPayment - friend.totalDebt;

            });

            // Sort array by highest debt(who should pay next)
            friendsArray.sort(utilityService.propComparator('currentState'));


            // Prefix dollar sign to positive and negative numbers
            angular.forEach(friendsArray, function(friend, index) {
                friendsArray[index].currentState = utilityService.formatMoney(friend.currentState, 0, "$");
            });

            // Return temp array
            return friendsArray;

        }
    };


    return service;
});
