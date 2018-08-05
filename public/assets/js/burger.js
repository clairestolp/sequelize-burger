$(function () {

    $('.devour').on('click', function () {
        const url = '/api/burgers/' + $(this).attr('data-id');
        let devoured = $(this).attr('data-devoured');
        if(devoured === "false") {
            //'1' sets devoured to true
            devoured = "1"
        }else{
            //'0' sets devoured to false
            devoured = "0"
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
        $.ajax('api/burgers', {
            type: 'POST',
            data: {burger: newBurger}
        }).then(function () {
            location.reload();
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