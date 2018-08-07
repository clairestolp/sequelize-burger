$(function () {

    $('.devour').on('click', function () {
        const url = '/api/burgers/' + $(this).attr('data-id');
        let devoured = $(this).attr('data-devoured');
        if(devoured === "false") {
            //'1' sets devoured to true
            devoured = true;
        }else{
            //'0' sets devoured to false
            devoured = false;
        }
        $.ajax(url, {
            type: 'PUT',
            data: {devoured: devoured}
        }).then(function() {  
            location.reload();
        });
    });

    $('#add').on('click', function () {
        const newBurger = $('#newBurger').val().trim();
        const customer = $('#customer').val().trim().toLowerCase();
        $.ajax('api/burgers', {
            type: 'POST',
            data: {
                burger: newBurger
            }
        }).then(function () {
            console.log('Success: new entry added for burgers');
        });

        /**
         * find out if customer exists
         * true: update foreign key
         * false: create new customer associate foreign key
         */
        
        const customerQuery = 'api/customers/' + customer;
        $.ajax(customerQuery, {
            type: 'GET',
            data: {
                customerName: customer
            }
        }).then((customer) => {
            console.log(customer);
        });

    });

    $('.deleteBtn').on('click', function () {
        const url = 'api/burgers/' + $(this).attr('data-id');

        $.ajax(url, {
            type: 'DELETE'
        }).then(function () {
            location.reload();
        });
    })
});