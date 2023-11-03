// Lab 7 - Functions
// Tien Le <ticale@ucsc.edu>
// 11/3/23

//Function declarations

/* sortName(name)
    Sorts the characters representing in a name by alphabetical order
    @param: name, a string
    @return: nameArray, sorted lowercase array
*/
function sortName(name) {
    // Task X 1: pretty easy if you make all lowercase, hard part is making them print uppercase (dunno if that matters)
    // https://www.w3schools.com/jsref/jsref_toLowerCase.asp ; toLowerCase() is NOT in place   
    nameArray = name.toLowerCase().split(''); // Create an array of only lowercased characters
    
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


/* nameArrayToString(name, nameArray)
    Turns a nameArray provided by sortName to a displayable string form, restoring capitalization
    @param: name, the original name string; nameArray, an array of sorted lowercase string tokens
    @return: finalString, single string w/ capitalization
*/
function nameArrayToString(name, nameArray) {
    // Part of Task X 1: shows sorted correctly WITH uppercase
    // String iteration help here: https://stackoverflow.com/questions/5943726/string-charatx-or-stringx/5943807#5943807
    // I'm gonna use bracket notation since I doubt anybody will run this on IE7...
    
    // Make a copy of nameArray, initialize other variables
    var copyArray = nameArray.slice();
    var arraySlice = [];
    var finalString = "";

    while (copyArray.length != 0) {
        // create slices of duplicate characters, reducing number of characters left in copyArray
        if (copyArray.length > 1) { 
            var i = 0; // counter
            while (i < (copyArray.length-1)) {
                if (copyArray[i] != copyArray[i+1]) { // compare with next elem in array, if differs, create slice of only duplicates
                    arraySlice = copyArray.slice(0, i+1);
                    copyArray.splice(0, arraySlice.length); // remove sliced portion from copyArray
                    //console.log(arraySlice, copyArray);
                    break;
                }
                else {
                    if ((i+1) === (copyArray.length-1)) { // in case it's duplicates until the end of the array
                        arraySlice = copyArray.slice();
                        copyArray.splice(0); // ensure copyArray is empty now!
                        //console.log(arraySlice, copyArray);
                        break;
                    }
                }
                ++i;
            }
        }
        else { // only one elem left in copyArray
            arraySlice = copyArray.slice();
                copyArray.splice(0); // ensure copyArray is empty now!
                //console.log(arraySlice, copyArray);
        }
        
        // count how many capitals of each character is in name
        i = 0; // reset counter
        var capitalCount = 0;
        while (i < name.length) {
            if (name[i] === arraySlice[0].toUpperCase()) {
                ++capitalCount;
            }
            ++i;
        }
        //console.log("Number of",arraySlice[0].toUpperCase(),":",capitalCount);

        // concatenate finalString with correct numbers of capitals
        while (arraySlice.length > 0) {
            if (capitalCount > 0) {
                finalString += arraySlice[0].toUpperCase();
                --capitalCount;
            }
            else {
                finalString += arraySlice[0];
            }
            arraySlice.splice(0,1);
        }
        //console.log(finalString);
    }
    return finalString;
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


// Main body 


/* Task X 5: pretty easy if you just declare your name var at beginning and then call function with that param

Some weirdness for Task X 5: 
function printName(name = window.prompt("Enter your name:")) {
    console.log(name);
}
*/
var userName = window.prompt("Enter your name:");
var userNameArray = sortName(userName);

document.writeln(`Hi there, ${userName}!! Nice to meet you!<br><br>`)
document.writeln("Here, I sorted your name for you: <b>", nameArrayToString(userName, userNameArray), "</b><br>All clean and tidy! It'd be a real shame if I- <br><br>");
// Task X 4: Simply include your <div> tag in your document.writeln() line (works for <i> etc.)
document.writeln("AWH DArn. I dropped them all... I think they're still fine, here you go... <div class=\"anagram\"><img src=\"img/dust.jpg\"/><div class=\"anagramtext\"><b>", anagram(userName, userNameArray),"</b></div></div>");
document.writeln("Just brush off the dust and it'll be good as new... I think.")
