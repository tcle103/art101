// Lab 13 - Loops
// Tien Le <ticale@ucsc.edu
// 11/27/23


// based on professor's version shown in the lab page
function fizzBuzzBoom(maxNum, factorObj) {
    // create a table containing results - https://stackoverflow.com/a/8749347
    var table = "<table>";
    var outputString = '';
    var words;
    for (var i = 0; i < maxNum; ++i) {
        words = '';
        outputString += "<td>";
        outputString += i;
        outputString += " ";
        for (var factor in factorObj) {
            if (i % factor == 0) {
                words += factorObj[factor];
            }
        }
        if (words) {
            outputString += (" - "+ words + "!");
        }
        outputString += "</td>";
        if (((i+1) % 6 == 0)) {
            table += ("<tr>"+outputString+"</tr>");
            outputString = '';
        }
    }
    table += ("<tr>"+outputString+"</tr>");
    table += "</table>";
    $("#output").append(table);
}

$("#submit").click(function(){
    $("#output").empty();
    var maxNum = $("#maxnum").val();
    var factors = [$("#num0").val(), $("#num1").val(), $("#num2").val(),  $("#num3").val()];
    var texts = [$("#text0").val(), $("#text1").val(), $("#text2").val(),  $("#text3").val()];
    
    // create factorObj from input - https://stackoverflow.com/a/69328904
    var factorObj = {};
    for (var i = 0; i < factors.length; ++i) {
        factorObj[factors[i]] = texts[i];
    }

    fizzBuzzBoom(maxNum, factorObj);
})