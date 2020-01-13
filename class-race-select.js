$(document).ready(function(){
    $(document).foundation();

    var races;
    var classes;

    function populateModal(){
        var thisBtnVal = $(this).attr("data-desc");
        var thisBtnType = $(this).attr("data-btn-type");
        if (thisBtnType === "race") {
            console.log("success!");
        }
    }

    // populate race selections
    $.ajax({
        url: "https://api.open5e.com/races/?format=json",
        method: "GET"
    }).then(function(response){
        races = response.results;
        for (x in response.results){
            var newRow = $('<div class="cell">');
            var thisResponseItem = response.results[x];
            var newRad = $('<input type="radio" name="race" data-val="' + thisResponseItem.slug + '"></input>');
            var newBtn = $('<button data-open="infoModal" class="hollow button" type="button" data-btn-type="race" data-desc="' + thisResponseItem.slug + '">' + thisResponseItem.name + '</button>');
            $("#racesForm").append(newRow);
            $(newRow).append(newRad);
            $(newRow).append(newBtn);
            $(newBtn).on("click", populateModal);
        }
    });

    //populate class selections
    $.ajax({
        url: "https://api.open5e.com/classes/?format=json",
        method: "GET"
    }).then(function(response){
        classes = response.results;
        for (x in response.results){
            var newRow = $('<div class="cell">');
            var thisResponseItem = response.results[x];
            var newRad = $('<input type="radio" name="race" data-val="' + thisResponseItem.slug + '"></input>');
            var newBtn = $('<button data-open="infoModal" class="hollow button" type="button" data-btn-type="class" data-desc="' + thisResponseItem.slug + '">' + thisResponseItem.name + '</button>');
            $("#classesForm").append(newRow);
            $(newRow).append(newRad);
            $(newRow).append(newBtn);
            $(newBtn).on("click", populateModal);
        }

    });
});