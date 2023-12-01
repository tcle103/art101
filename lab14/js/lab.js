// Lab 14 - Debugging
// Tien Le <ticale@ucsc.edu>
// 12/1/23

// variables (from Lab 6)
var myTransport = ["bus", "walking", "car"];
var myMainRide = {
  make: "Honda",
  model: "Odyssey",
  color: "Gold",
  year: 2005,
  age: function() {
    return 2023 - this.year;
  }
};

// writing a function to test out using debugger on
function testFunction() {
    var indexArray = ["sheep", "cow", "horse", "dog", "frog"];
    var valuesArray = ["baa", "moo", "neigh", "woof", "ribbit"];
    var oldMacDonalds = {};
    for (var i = 0; i < indexArray.length; ++i) {
        oldMacDonalds[indexArray[i]] = valuesArray[i];
        //debugger;
    }
    console.log(oldMacDonalds);
}

// output! (myMainRide is an object so printing it is weird!) (from Lab 6)
$("#output").append(`<div class='script'>Going places:  ${myTransport}<br></div>`);
$("#output").append("<div class='script'><i>The</i> Dragonmobile: <pre>"+
  JSON.stringify(myMainRide, function(key, value) {
    if (key === "age") {
      return myMainRide.age();
    }
    else {
      return value;
    }
  }, '\t')+ "</pre></div>");

  testFunction();