$(document).ready(function(){
    $(document).foundation();

    var randDropDownPanes = $(".rand-dd");
    var randStatCalloutEls = $(".rand-callout")
    var statTypes = ["STR", "DEX", "CON", "INT", "WIS", "CHA", "blank"];

    // add event listener to all callouts
    $(randStatCalloutEls).on("click", populateButtons);
    // generate random stat values when the "roll" button is clicked
    $("#randomStats").on("click", function(){
        var d6Vals = [];
        var statRolls = [];
        var statRollTotals = [];
        $.ajax({
            // roll 24d6
            url: "http://roll.diceapi.com/json/24d6",
            method: "GET"
        }).then(function(response){
            // store all 24 rolls in an array
            for (var i = 0; i < response.dice.length; i++){
                d6Vals.push(response.dice[i].value);
            }
            // split them up into 6 rolls of 4, drop the lowest.
            while (d6Vals.length){
                statRolls.push(dropLowest(d6Vals.splice(0,4)));
            }
            // reduce each sub-array to the total, and store them in statRollTotals.
            for (var i=0; i< statRolls.length; i++){
                statRollTotals.push(statRolls[i].reduce(getSum, 0));
            }
            // display the stat roll results in the "roll for stats" divs
            populateRandStats(statRollTotals);
        });
    });
    
    function populateRandStats(arr){
        var rolledStatDivs = $("#rolledStats").children();
        for (var i=0; i<rolledStatDivs.length; i++){
            var currentStatEl = $(rolledStatDivs[i]).children()[0];
            var currentStatVal = arr[i];
            var calloutStatVal = $("<span>");
            var calloutText = $("<span>");
            $(calloutText).addClass("callout-text");
            $(calloutStatVal).text(currentStatVal);
            $(calloutText).text(": Click to Assign a Stat");
            $(currentStatEl).append(calloutStatVal);
            $(currentStatEl).append(calloutText);
        }
    }
    
    function dropLowest(arr) {
        var min = Math.min.apply(null, arr);
        var minIndex = arr.indexOf(min);
        arr.splice(minIndex, 1);
        return arr;
    }
    
    function getSum(total, num) {
        return total + num;
    }

    function populateButtons(){
        var btnVals = statTypes;
        var siblingDropdown = $(this).parent().children()[1];
        // var siblingCallout = $(this).parent().children()[0];
        
        // find the values of all the callout texts, to search for already 
        // assigned stats
        var allCalloutTexts = $(".callout-text");
        // loop through the callout texts and remove those values from btnVals
        for (var i=0; i<allCalloutTexts.length; i++){
            var currentVal = $(allCalloutTexts[i]).text();
            var indexInBtnVals = btnVals.indexOf(currentVal);
            if (indexInBtnVals > -1){
                btnVals.splice(indexInBtnVals, 1);
            }
        }
        // console.log(allCalloutTexts);
        // var disabledButtons = findDisabled();
        $(siblingDropdown).empty();
        for (var i=0; i<btnVals.length; i++){
            var newStatButton = $("<button>");
            $(newStatButton).addClass("button");
            $(newStatButton).html(btnVals[i]);
            $(siblingDropdown).append(newStatButton);
            $(newStatButton).on("click", btnToStat);
        }
    }
    
});

function btnToStat(){
    var chosenStat = $(this).html();
    // console.log(chosenStat);
    var ancestCallout = $(this).parent().parent().children()[0];
    // console.log(ancestCallout);
    var uncleSpan = $(ancestCallout).children()[1];
    $(uncleSpan).text(": " + chosenStat);
}