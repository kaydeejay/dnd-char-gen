// this js file will be linked to all three html file pages. 
// It will contain the user's character object, as well as the functions
// to save data to said object and open the next page in the application.

$(document).ready(function(){
    
    // user character object
    var strScore = localStorage.getItem("STR");
    console.log(strScore);
    
    $("#saveRaceClass").on("click", saveAndContinue1);
    $("#saveRoll").on("click", saveAndContinueRoll);
    $("#saveStand").on("click", saveAndContinueStand);
    $("#savePB").on("click", saveAndContinuePB);

    // save and continue function on page 1
    // saves user selections to the user character object, as well as to localStorage
    function saveAndContinue1(){
        var checkedClassRad = $('input[name="class"]:checked', '#classesForm').attr("data-val");
        var checkedRaceRad = $('input[name="race"]:checked', '#racesForm').attr("data-val");
        localStorage.setItem("class", checkedClassRad);
        localStorage.setItem("race", checkedRaceRad);
        window.open("./page-2.html", "_self");
    }

    // save and continue function on page 2
    // saves user selections to the user character object, as well as to localStorage
    function saveAndContinueRoll(){
        var rolledStatDivs = $(".rand-callout");
        for (var i=0; i<rolledStatDivs.length; i++){
            var rolledStatSpan = $(rolledStatDivs[i]).children()[0];
            var statValue = $(rolledStatSpan).text();
            var statSelectOption = $(rolledStatDivs[i]).children()[1];
            var statSelected = $(statSelectOption).find("option:selected").attr("value");
            localStorage.setItem(statSelected, statValue);
        }
        window.open("./character-sheet.html", "_self");
    }

    function saveAndContinueStand(){
        console.log("saveStand");
    }

    function saveAndContinuePB(){
        console.log("savePB");
    }

    // populate character sheet from localStorage 
    function populateCharSheet(){
        $("#strScore").text(localStorage.getItem("STR"));
        $("#dexScore").text(localStorage.getItem("DEX"));
        $("#conScore").text(localStorage.getItem("CON"));
        $("#intScore").text(localStorage.getItem("INT"));
        $("#wisScore").text(localStorage.getItem("WIS"));
        $("#chaScore").text(localStorage.getItem("CHA"));
    }
    populateCharSheet();
    // Icebox:
    // save character sheet info *to* localStorage when changes are made
    function saveCharacterEdits(){}

});