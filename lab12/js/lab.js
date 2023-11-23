// Lab 12 - Conditionals
// Tien Le <ticale@ucsc.edu>
// 11/22/23

var houseArray = [ "Gryffindor", "Ravenclaw", "Slytherin", "Hufflepuff" ];

// hashing stuff from the source linked in the lab, https://stackoverflow.com/a/8831937 
function hash(str) {
    var hash = 0;
    var i;
    for (i = 0; i < str.length; ++i) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function sortingHat(str) {
    return houseArray[Math.abs(hash(str) % houseArray.length)];
}

$("#submit").click(function(){
    var remarks = [
        "Right... okay... hmm...", "Tough one, but...", "Aha!", "Of course...", "Obviously,"
    ]
    $("#output").empty();
    var house = sortingHat($("#input").val());
    $("#output").append(remarks[Math.floor(Math.random()*remarks.length)]+
                        "<br>"+`<div id='house'><b>${house.toUpperCase()}!</b></div>`);
})