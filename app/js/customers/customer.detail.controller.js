(function() {
    'use strict';

    angular
        .module('app')
        .controller('CustomerDetailController', CustomerDetailController);

    CustomerDetailController.$inject = ['$stateParams', 'CustomerFactory', 'toastr','ReviewFactory'];

    /* @ngInject */
    function CustomerDetailController($stateParams, CustomerFactory, toastr, ReviewFactory) {
        var vm = this;
        vm.title = 'CustomerDetailController';

        // variables
        vm.customerId = $stateParams.customerId;
        vm.customer;
        vm.reviewMode = true;

        // functions
        vm.deleteCustomer = deleteCustomer;
        vm.getCustomerById = getCustomerById;
        vm.sumOrder = sumOrder;

        activate();

        ////////////////

        function activate() {
            getCustomerById(vm.customerId);
        }

        function deleteCustomer(id) {
            CustomerFactory.remove(id).then (
                function(response) {
                    toastr.success("Customer successfully deleted.");
                    vm.customer = {};
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                }
            );
        }

        function getCustomerById(id) {
            CustomerFactory.getById(id).then (
                function(data) {
                    vm.customer = data;
                    console.log(data);
                },
                function(error) {
                    toastr.error(error.status, error.statusText);
                }
            );
        }

        function sumOrder(order) {
            var sum = 0;
            var orderItemLength = order.orderItems.length;
            
            for (var i = 0; i < orderItemLength; i++) {
                sum += order.orderItems[i].menuItem.price;
            }

            return sum;
        }
        function removeReview(review) {
            if (confirm("Are you sure you want to remove this Review?")) {
                ReviewFactory.remove(review.reviewId).then(
                    function() {
                        // var index = vm.reviews.indexOf(review);
                        // vm.reviews.splice(index, 1);
                        getCustomerById();
                        console.log("removed the review");
                    }
                );
            }
        }
    }
})();