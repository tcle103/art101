// Lab 11 - JavaScript Events and Forms
// Tien Le <ticale@ucsc.edu>
// 11/19/23


// my own code from last time!
/* sortName(name)
    Sorts the characters representing in a name by alphabetical order
    @param: name, a string
    @return: nameArray, sorted lowercase array
*/
function sortName(name) {
    // Task X 1: pretty easy if you make all lowercase, hard part is making them print uppercase (dunno if that matters)
    // https://www.w3schools.com/jsref/jsref_toLowerCase.asp ; toLowerCase() is NOT in place   
    var nameArray = name.toLowerCase().split(''); // Create an array of only lowercased characters
    
    removeSpaces(nameArray); // Remove spaces from array, in place means don't have to assign it to anything
    // does it matter that i've called this here before declaring it? - tested in console, the answer is no!
    
    nameArray.sort(); // sort in place

    return nameArray; // it's not quite what the lab calls for but for Task X it's more useful to return the array as is
}

/* removeSpaces(array)
    Helper function for removing all the characters representing spaces from an array in place
    @param: array, an array of string tokens
    @return: nothing
*/
function removeSpaces(array) {
    // Task X 2: Help with removing spaces - https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
    var i = 0; // counter
    while (i < array.length) { 
        if (array[i] === ' ') {
            array.splice(i, 1);
        }
        else { // this one is kind of tricky but i think it's cause this index will contain the next item if spliced
            ++i; // didn't know there was c style increment here
        }
    }
    return;
}

/* anagram(name, nameArray)
    Makes an anagram out of an array of sorted, lowercase characters
    @param: name, a string; nameArray, a sorted lowercase array
    @return: anagram, a string
*/
function anagram(name, nameArray) {
    // Task X 3: Shuffling, see if there is a random for use in JS.
    // https://www.w3schools.com/JS/js_random.asp

    // make a copy of nameArray
    var copyArray = nameArray.slice();
    
    // count how many spaces in name
    var i = 0; // counter
    var spaceCount = 0;
    while (i < name.length) {
        if (name[i] === " ") {
            ++spaceCount;
        }
        ++i;
    }

    // add the appropriate amount of spaces
    while (spaceCount > 0) {
        copyArray.push(" ");
        --spaceCount;
    }

    // shuffle copyArray 50 times or something
    i = 0; // reset counter
    var temp = "";
    var randomNum = 0;
    while (i < 51) { // basically just picks a random character, takes it out of the list, and puts it at the beginning
        randomNum = Math.floor(Math.random() * (copyArray.length));
        temp = copyArray[randomNum];
        copyArray.splice(randomNum, 1);
        copyArray.unshift(temp);
        ++i;
    }
    //console.log(copyArray);

    // create anagram w/ correct capitalization
    var anagram = '';
    i = 0; // reset counter
    while (i < copyArray.length) {
        if (i === 0) { // capitalize first letter or removing heading space
            if (copyArray[0] === " ") {
                ++i;
                continue;
            }
            anagram += copyArray[i].toUpperCase();
        }
        else {
            if (i === (copyArray.length-1)) { // remove trailing spaces for CSS formatting later
                if (copyArray[i] === " ") {
                    break;
                }
            }
            if (copyArray[i-1] === " ") { // capitalize all characters that come after a space
                anagram += copyArray[i].toUpperCase();
            }
            else {
                anagram += copyArray[i];
            }
        }
        ++i;
    }
    //console.log(anagram);
    return anagram;
}

// stuff written for this lab

function glitch(){
    console.log("uhohh");
    var time = Math.floor((Math.random() * 10500)+500);
    setTimeout(function() {
        // random element selector from here https://stackoverflow.com/a/14638679
        var choice = Math.floor(Math.random()*10);
        var divs = $("div");

        switch (choice) {
            case 1:
                console.log("case 1");
                $(divs[Math.floor(Math.random()*divs.length)]).append("' ੈ✩‧₊");
                $(divs[Math.floor(Math.random()*divs.length)]).append(".:*・°");
                
            case 4:
                console.log("case 4");
                $(divs[Math.floor(Math.random()*divs.length)]).toggleClass("special");

            case 7:
                console.log("case 7");
                $(divs[Math.floor(Math.random()*divs.length)]).css("color", "red");
                $(divs[Math.floor(Math.random()*divs.length)]).css("filter", "invert(1)");
                break;

            case 2:
                console.log("case 2");
                $(divs[Math.floor(Math.random()*divs.length)]).css("height", "50%");
                $(divs[Math.floor(Math.random()*divs.length)]).append("' ੈ✩‧₊");
            case 5:
                $(divs[Math.floor(Math.random()*divs.length)]).append(`<button id="glitchButt">Party it up?</button>`);
                $("#glitchButt").click(function(){
                    $(this).parent().toggleClass("special");
                })
            case 8:
                $(divs[Math.floor(Math.random()*divs.length)]).css("filter", "contrast(150%)");
                $(divs[Math.floor(Math.random()*divs.length)]).css("filter", "hue-rotate(80deg)");
                break;
            
            case 3:
                $(divs[Math.floor(Math.random()*divs.length)]).prepend("Uh oh, something went wrong!");
            case 6:
                $(divs[Math.floor(Math.random()*divs.length)]).css("font", "30px cursive");
                $(divs[Math.floor(Math.random()*divs.length)]).append("<div><img class='uhoh' src='img/starborder.png'/></div>");
            case 9:
                $(divs[Math.floor(Math.random()*divs.length)]).toggleClass("uhoh");
                $(divs[Math.floor(Math.random()*divs.length)]).toggleClass("uhoh1");
                $(divs[Math.floor(Math.random()*divs.length)]).append(".:*・°");
                break;
            
            case 0:
                console.log("case 0");
                return;

        }
        glitch()
    }, time);
}

function nametag(name) {
    $("#nametag-container").empty();
    var anagramName = anagram(name, sortName(name));
    console.log(anagramName);
    $("#nametag-container").append(`<svg id="nametag-out" width="400" height="250"><g id="nametag">
    <rect id="nametag-base" x="0" y="0" width="400" height="250" rx="15"/>
    <rect x="25" y="125" width="350" height="100" fill="white"/>
    <text id="nametag-hello" x="110" y="60">H E L L O</text>
    <text id="nametag-label" x="145" y="95">my name is</text>
</g></svg>`);
    $("#nametag-container").append(`<p id="anagram">${anagramName}</p>`);
}

function makeButtons(color, sparkle) {
    $("#buttons-container").empty();
    $("#buttons-container").append(`<button id="colorButton">Paint it ${color}!</button>`);
    $("#colorButton").click(function() {
        $("#nametag-base").css("fill", `${color}`);
    })
    
    $("#buttons-container").append(`<button id="partyButton">Party it up?</button>`);
    $("#partyButton").click(function() {
        $("#results").toggleClass("special");
        if ($("#results").hasClass("special")) {
            $("#partyButton").html("Party it down...");
        }
        else {
            $("#partyButton").html("Party it up?");
        }
    })

    console.log(typeof(sparkle));
    if (sparkle === "1") {
        $("#buttons-container").append("<button id='sparkleButton'>Activate sparkles!!</button>");
        $("#sparkleButton").click(function() {
            glitch();
            $("#sparkleButton").toggleClass("hide");
            $("#buttons-container").append("<p>Uh oh, something went wrong...</p>");
        });

    }
}



$("#submit").click(function(){
    nametag($("#user-name").val());
    makeButtons($("#user-color").val(), $('input[name="sparkles"]:checked').val());
})