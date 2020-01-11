$(document).ready(function(){
    $(document).foundation();

    var randStatCalloutEls = $(".rand-callout")
    var statTypes = ["-", "STR", "DEX", "CON", "INT", "WIS", "CHA"];

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
            // empty previous roll (if user presses "roll" twice)
            // everyone gets a crummy roll sometimes!
            $(currentStatEl).empty();
            var currentStatVal = arr[i];
            var currentStatDisplay = $("<span>");
            var statSelectForm = $("<form>");
            var statSelectFormLabel = $("<label>");
            var statSelectFormSel = $("<select>");
            $(statSelectFormSel).addClass("dropdown-input");

            /*
            // make a dropdown option for each stat type:
            for (var j=0; j<statTypes.length; j++){
                var statOption = $("<option>");
                $(statOption).attr("value", statTypes[j]);
                $(statOption).attr("class", "stat-select-option");
                $(statOption).text(statTypes[j]);
                $(statSelectFormSel).append(statOption);
            }
            */
            
            $(currentStatDisplay).text(currentStatVal);
            $(statSelectFormLabel).text("Assign a Stat to This Score:");
            $(currentStatEl).append(currentStatDisplay);
            $(currentStatEl).append(statSelectForm);
            $(statSelectForm).append(statSelectFormLabel);
            $(statSelectForm).append(statSelectFormSel);
            
            $(statSelectFormSel).change(populateButtons);
        }
        populateButtons();
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
        // store already selected values
        var alreadySelected = [];
        var dropDowns = $(".dropdown-input");
        for (var i=0; i<dropDowns.length; i++){
            alreadySelected.push($(dropDowns[i]).val());
        }
        // loop through the statTypes array and make a dropdown option for each one
        for (var i=0; i<statTypes.length; i++){
            // don't allow the option to disable the "-" option
            if (statTypes[i] !== "-"){
                if (alreadySelected.indexOf(statTypes[i]))
            }
        }
        
    }
    
    // Below this line is the "function graveyard."

    /*function disableSelected(){
        var dropdownInputs = $(".dropdown-input");
        var thisVal = $(this).val();
        // var dropdownOptions = $(".stat-select-option");
        var alreadySelected = [];
        for (var i=0; i<dropdownInputs.length; i++){
            alreadySelected.push($(dropdownInputs[i]).val())
        }
        for (var i=0; i<dropdownInputs.length; i++){
            $(dropdownInputs[i]).find("option").prop("disabled", false);
            if (thisVal !== "-") {
                $(dropdownInputs[i]).find('option[value="' + thisVal + '"]').prop("disabled", true);
            }
        }
    }
    */
    
    /*function disableSelected(){
        var thisVal = $(this).val();
        // grab all the dropdown inputs
        var dropdownInputs = $(".dropdown-input");
        // grab all the dropdown input options
        var dropdownOptions = $(".stat-select-option");
        // loop through them and get all the selected values
        var alreadySelected = [];
        for (var i=0; i<dropdownInputs.length; i++){
            alreadySelected.push($(dropdownInputs[i]).val());
        }
        console.log(alreadySelected);
        // loop through already selected, then loop through the inputs and look for matches
        // for (var i=0; i<alreadySelected.length; i++){
        //     for (var j=0; j<dropdownInputs.length; j++){
        //         if (alreadySelected[i] !== "-"){
        //             $(dropdownInputs[i]).attr("disabled", "true");
        //         }
        //     }
        // }
    }
    */
    
});