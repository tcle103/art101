// Lab 8 - Anon Functions and Callbacks
// Tien Le <ticale@ucsc.edu>
// 11/6/2023

// variables
var arr = [ 3, 10, 65, 8 ];


// named functions
function nearestEven(x) {
    if (x % 2 === 1) {
        return (x - 1);
    }
    else {
        return x;
    }
}


// main

console.log("Nearest even of 3:", nearestEven(3));
console.log("Nearest even of 10:", nearestEven(10));

var neResult = arr.map(nearestEven);
var twoDownResult = arr.map(function(x) {
    return (x-2);
})

console.log("Original array: [" + arr +"]");
console.log(`Nearest even'd array: [${neResult}]` );
console.log(`Array taken down a couple pegs: [${twoDownResult}]`);


// Task X 1 - output on page using .getElementById() and .innerHTML()
var outputEl = document.getElementById("output"); 
var mapResults = "Original array: [" + arr +"]<br>"+`Nearest even'd array: [${neResult}]<br>`+`Array taken down a couple pegs: [${twoDownResult}]<br>`
outputEl.innerHTML = mapResults; // put your results here

// Task X 2 - common methods that use callbacks! .sort(), setTimeout()
//.sort()
function reverseSort(a,b) {
    return b-a;
}
console.log(`Reverse sorted array: [${arr.sort(reverseSort)}]`);
var sortResult = mapResults + `Reverse sorted array: [${arr.sort(reverseSort)}]<br>`;
outputEl.innerHTML = sortResult;

// setTimeout()
function surprise() {
    temp = outputEl.innerHTML;
    console.log("Surprise!")
    outputEl.innerHTML = temp + "<div id=\"surprise\">Surprise!<div>";
}
setTimeout(surprise, 5000);

// Task X 3
// decorative
function padding(x, len) {
    var length = (len - x.length);
    var padded = ' ੈ✩‧₊˚';
    var i = 0;
    while (i < ((Math.floor(length/2)*2)-5)) {
        padded += " ";
        ++i;
    }
    padded += x;
    i = 0;
    while (i < ((Math.ceil(length/2)*2))) {
        padded += " ";
        ++i;
    }
    padded += ' ੈ✩‧₊˚';
    return padded;
}

function printStars(callbackFn) {
    var compliments = ["I love you!", "Have a great day!", "You're beautiful!", "You look great!", 
                "Good work today!", "Take care of yourself!", "Drink some water!", "You're wonderful!"]
    var words = callbackFn(compliments[Math.floor(Math.random() * (compliments.length))], 33);
    var final = "☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆<br>"+
                ' ੈ✩‧₊˚                                                          ੈ✩‧₊˚<br>'+
                    words+
                '<br> ੈ✩‧₊˚                                                          ੈ✩‧₊˚<br>'+
                "☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆"
    console.log("Stars printed!");
    document.getElementById("stars").innerHTML = final;
    return;
}

printStars(padding);

