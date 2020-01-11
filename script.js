$(document).ready(function(){
    $(document).foundation();

    var randDropDownPanes = $(".rand-dd");
    var randStatCalloutEls = $(".rand-callout")
    var statTypes = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

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
            // populateButtons(randDropDownPanes);
        });
    });
    
    function populateRandStats(arr){
        var rolledStatDivs = $("#rolledStats").children();
        for (var i=0; i<rolledStatDivs.length; i++){
            // console.log($(rolledStatDivs[i]).children()[0]);
            var currentStatEl = $(rolledStatDivs[i]).children()[0];
            var currentStatVal = arr[i];
            var dropDownText = $("<span>");
            $(currentStatEl).text(currentStatVal);
            $(dropDownText).text(": Click to Assign a Stat");
            $(currentStatEl).append(dropDownText);
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
        // for (var i=0; i<obj.length; i++){}
        console.log(this);
        var btnVals = statTypes;
        var siblingCallout = $(this).parent().children()[1];
        console.log(btnVals);
        for (var i=0; i<btnVals.length; i++){
            var newStatButton = $("<button>");
            $(newStatButton).addClass("button");
            $(newStatButton).html(btnVals[i]);
            $(siblingCallout).append(newStatButton);
        }
    }
    
});

// addDropdownButtons();
// function addDropdownButtons(){
//     var randStats = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
//     for (var i=0; i<randStats.length; i++){
//         var newStatButton = $("<button>");
//         $(newStatButton).addClass("button");
//         $(newStatButton).html(randStats[i]);
//         $(newStatButton).on("click", btnToStat);
//         $(randDropDownPanes).append(newStatButton);
//     }
// }

// function btnToStat(){
//     var chosenStat = $(this).html();
//     var ancestCallout = $(this).parent().parent().children()[0];
//     var uncleSpan = $(ancestCallout).children()[0];
//     $(uncleSpan).text(": " + chosenStat);
// }