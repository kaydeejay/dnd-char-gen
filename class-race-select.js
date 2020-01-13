$(document).ready(function(){
    $(document).foundation();

    var races;
    var classes;

    function populateModal(){
        var thisBtnVal = $(this).attr("data-desc");
        var thisBtnType = $(this).attr("data-btn-type");
        var modalTitle = $("#modalTitle");
        var modalSimpleDesc = $("#simpleDesc");
        var modalTraitsDesc = $("#traitsDesc");
        if (thisBtnType === "race") {
            for (var i=0; i<races.length; i++){
                if (races[i].slug === thisBtnVal){
                    $(modalTitle).text(races[i].name);
                    $(modalSimpleDesc).text(races[i].desc);
                    $(modalTraitsDesc).text(races[i].traits);
                }
            }
        } else if (thisBtnType === "class") {
            for (var i=0; i<classes.length; i++){
                if (classes[i].slug === thisBtnVal){
                    $(modalTitle).text(classes[i].name);
                    $(modalSimpleDesc).text("");
                    $(modalTraitsDesc).text(classes[i].desc);
                }
            }
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
            $("#racesFormCol").append(newRow);
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
            var newRad = $('<input type="radio" name="class" data-val="' + thisResponseItem.slug + '"></input>');
            var newBtn = $('<button data-open="infoModal" class="hollow button" type="button" data-btn-type="class" data-desc="' + thisResponseItem.slug + '">' + thisResponseItem.name + '</button>');
            $("#classesFormCol").append(newRow);
            $(newRow).append(newRad);
            $(newRow).append(newBtn);
            $(newBtn).on("click", populateModal);
        }

    });
});