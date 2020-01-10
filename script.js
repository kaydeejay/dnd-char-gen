$(document).ready(function(){
    $(document).foundation();

    // $("#randomStats").on("click", function(){
    //     var rolledStatDivs = $("#rolledStats").children();
    //     for (var i=0; i<rolledStatDivs.length-1; i++){
    //         console.log($(rolledStatDivs[i]).children()[0]);
    //         var currentStatEl = $(rolledStatDivs[i]).children()[0];
    //         var currentStatVal = 
    //     }
    // });

    $("#randomStats").on("click", function(){
        var statRollVals = [];
        $.ajax({
            url: "http://roll.diceapi.com/json/24d6",
            method: "GET"
        }).then(function(response){
            var thisStatVal = [];
            for (var i=0;i<6;i++){
                thisStatVal.push(response.dice[])
            }
        });
    })

});