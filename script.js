$(document).ready(function(){
    $(document).foundation();

    var dropDownPanes = $(".dropdown-pane");

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
            // console.log($(rolledStatDivs[i]).children()[0]);
            var currentStatEl = $(rolledStatDivs[i]).children()[0];
            var currentStatVal = arr[i];
            var dropDownText = $("<p>");
            $(currentStatEl).text(currentStatVal);
            $(dropDownText).text("Click to Assign a Stat");
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

    // append buttons for each stat to all dropdowns
    // add event listener to all the dropdowns
    // add avent listener to all dropdown buttons
    // when clicked, change text of the callout <p> to the chosen stat
    // add a "clear" button
    //   when clicked, reset text to "click to assign stat"

    
    console.log(dropDownPanes);
    for (var i = 0; i < dropDownPanes.length; i++);
        


});