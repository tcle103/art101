// Lab 9 - Libraries and jQueries
// Tien Le <ticale@ucsc.edu>
// 11/11/23

// make buttons in each sections
$(".minor-section").append("<button class='special-button'>Make Special</button>");

// make each button toggle "special" for the section it is in on
$(".special-button").click(function(){ 
    $(this).parent().toggleClass("special");
    // text toggle (extra)
    if ($(this).parent().hasClass("special")) {
        $(this).html("Make Unspecial");
    }
    else {
        $(this).html("Make Special");
    }
})

// longer version
/*
// make buttons in each section
$("#challenge").append("<button id='challenge-button'>Make Special</button>");
$("#thoughts").append("<button id='thoughts-button'>Make Special</button>");
$("#results").append("<button id='results-button'>Make Special</button>");

// make each button toggle "special" for its section
$("#challenge-button").click(function(){
    $("#challenge-button").toggleClass("special");
});
$("#thoughts-button").click(function(){
    $("#thoughts-button").toggleClass("special");
});
$("#results-button").click(function(){
    $("#results-button").toggleClass("special");
});
*/

