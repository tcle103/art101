// Lab 6: Array and Objects
// Tien Le
// 10/30/23

// variables
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

// output! (myMainRide is an object so printing it is weird!)
document.writeln("Going places: ", myTransport+"<br>");
document.writeln("<i>The</i> Dragonmobile: <br><pre>",
  JSON.stringify(myMainRide, function(key, value) {
    if (key === "age") {
      return myMainRide.age();
    }
    else {
      return value;
    }
  }, '\t'), "</pre>");