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
document.writeln("<i>The</i> Dragonmobile: <pre>",
  JSON.stringify(myMainRide, null, '\t'), "</pre>");