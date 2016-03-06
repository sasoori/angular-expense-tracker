angular.module('expenseTracker').factory('friendService',function(utilityService) {

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


        modelPaymentList : {
             payment:[

            ]
        },

        //Global functions
        getFriendByID: function(id) {
            var rFriend = {};
            angular.forEach(service.model.friendList, function (friend) {

                if (friend.id === id) {
                    rFriend = friend;
                }

            });

            return rFriend;
        },

        resetValues: function(cb){

            angular.forEach(service.model.friendList, function (friend, index) {


                service.model.friendList[index].totalPayment = 0;
                service.model.friendList[index].totalDebt = 0;
                service.model.friendList[index].currentState = 0;

            });

            cb();
        },
        addPaymentToPaymentList: function(payerID, total, consumersList){


            var compiledMessage = service.getFriendByID(payerID).name + ' payed $' + total + ' for';

            angular.forEach(consumersList, function(friend, i){

                        if (i === consumersList.length - 1){

                            compiledMessage  = compiledMessage + ' ' + friend.name + '($' + friend.amount + ')';
                        }else{

                            compiledMessage  = compiledMessage + ' ' + friend.name + '($' + friend.amount+ '),';
                        }

            });

            service.modelPaymentList.payment.push({

                id: utilityService.guid(),
                date: (new Date()).toUTCString(),
                message:compiledMessage,
                paymentInfo:
                 {
                    total: total,
                    payerID: payerID,
                    consumersList:consumersList.slice()
                 }
            });

         },



        addTotalPayment: function(id, amount){


            angular.forEach(service.model.friendList, function (friend, index) {

                if (friend.id === id) {


                    service.model.friendList[index].totalPayment += amount;

                }
            });
        },

        addTotalDebt: function(id, amount){

            angular.forEach(service.model.friendList, function (friend, index) {

                if (friend.id === id) {

                    service.model.friendList[index].totalDebt += amount;

                }

            });

        },


        getTotalPayment: function(cb){

            angular.forEach(service.modelPaymentList.payment, function(paymentList) {


                    // Loop through paymentList
                    service.addTotalPayment(paymentList.paymentInfo.payerID, paymentList.paymentInfo.total);

                    // Loop through consumersList of PaymentList
                    angular.forEach(paymentList.paymentInfo.consumersList, function(consumer) {

                        service.addTotalDebt(consumer.id, consumer.amount);

                    });
             });

            cb();
        },

        getDebt: function(){

            var friendsArray = service.model.friendList.slice();

            angular.forEach(service.model.friendList, function(friend, index){

                    friendsArray[index].currentState =  friend.totalPayment - friend.totalDebt;

            });


            friendsArray.sort(utilityService.propComparator('currentState'));


            angular.forEach(friendsArray, function(friend, index) {

                friendsArray[index].currentState = utilityService.formatMoney(friend.currentState, 0, "$")

            });


            return friendsArray;

        }
    };


    return service;
});
