$(document).ready(function(){
    $(document).foundation();

    var statTypes = ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"];
    var randStatDivs = $("#rolledStats").children();
    var randStatCallouts = $(randStatDivs).children();
    var standStatDivs = $("#standardStats").children();
    var standStatCallouts = $(standStatDivs).children();
    var pointBuyWell = $("#pointWell");
    var pbIncBtns = $(".incBtn");
    var pbDecBtns = $(".decBtn");
    
    // make inputs for standard array
    makeInputs(standStatCallouts);

    // increment stats when increment buttons are clicked
    $(pbIncBtns).on("click", function(){
        var statValue = parseInt($("[data-stat='" + $(this).attr("data-inc") + "']").text());
        var pointsRemaining = parseInt($(pointBuyWell).text());
        if (pointsRemaining > 0 && pointsRemaining < 28){
            if (statValue === 13){
                if (pointsRemaining > 1){
                    statValue++;
                    $("[data-stat='" + $(this).attr("data-inc") + "']").text(statValue);
                    pointsRemaining -= 2;
                    $(pointBuyWell).text(pointsRemaining);
                }
            } else if (statValue > 7 && statValue < 15) {
                statValue++;
                $("[data-stat='" + $(this).attr("data-inc") + "']").text(statValue);
                pointsRemaining--;
                $(pointBuyWell).text(pointsRemaining);
            }
        }
    });

    // decrement stats when decrement buttons are clicked
    $(pbDecBtns).on("click", function(){
        var statValue = parseInt($("[data-stat='" + $(this).attr("data-dec") + "']").text());
        var pointsRemaining = parseInt($(pointBuyWell).text());
        if (pointsRemaining > -1 && pointsRemaining < 27){
            if (statValue === 14){
                if (pointsRemaining < 26){
                    statValue--;
                    $("[data-stat='" + $(this).attr("data-dec") + "']").text(statValue);
                    pointsRemaining += 2;
                    $(pointBuyWell).text(pointsRemaining);
                }
            } else if (statValue > 8 && statValue < 16) {
                statValue--;
                $("[data-stat='" + $(this).attr("data-dec") + "']").text(statValue);
                pointsRemaining++;
                $(pointBuyWell).text(pointsRemaining);
            }
        }
    });

    // generate random stat values when the "roll" button is clicked
    $("#randomStatsButton").on("click", function(){
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
        for (var i=0; i<randStatDivs.length; i++){
            var currentStatEl = $(randStatDivs[i]).children()[0];
            $(currentStatEl).empty();
            var currentStatVal = arr[i];
            var currentStatDisplay = $("<span>");
            $(currentStatDisplay).text(currentStatVal);
            $(currentStatEl).append(currentStatDisplay);
        }
        makeInputs(randStatCallouts);
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

    function disableSelected(){
        var allSelected = $(".dropdown-input").map(function(){
            return $(this).val();
        }).get();
        $(".dropdown-input option").removeAttr("disabled");
        $(".dropdown-input option:not(:selected):not([value='-'])").each(function(){
            if ($.inArray($(this).val(), allSelected) !== -1) {
                $(this).attr("disabled", true);
            }
        });
        
    }

    function makeInputs(obj){
        for (var i=0; i<obj.length; i++){
            var statSelectForm = $("<form>");
            var statSelectFormLabel = $("<label>");
            var statSelectFormSel = $("<select>");
            $(statSelectForm).addClass("stat-select-form");
            $(statSelectFormSel).addClass("dropdown-input");

            // make a dropdown option for each stat type:
            for (var j=0; j<statTypes.length; j++){
                var statOption = $("<option>");
                $(statOption).attr("value", statTypes[j]);
                $(statOption).attr("class", "stat-select-option");
                $(statOption).text(statTypes[j]);
                $(statSelectFormSel).append(statOption);
            }
            $(statSelectFormLabel).text("Assign a Stat to This Score:");
            $(obj[i]).append(statSelectForm);
            $(statSelectForm).append(statSelectFormLabel);
            $(statSelectForm).append(statSelectFormSel);
            
            $(statSelectForm).on("change", statSelectFormSel, disableSelected);
        }
    }

});