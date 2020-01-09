$(document).ready(function(){

    $.ajax({
        url: "https://api.open5e.com/?format=json",
        method: "GET",
    }).then(function(response){
        console.log(response);
    });

});