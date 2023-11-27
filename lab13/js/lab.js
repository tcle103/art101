// Lab 13 - Loops
// Tien Le <ticale@ucsc.edu
// 11/27/23


// based on professor's version shown in the lab page
function fizzBuzzBoom(maxNum, factorObj) {
    var outputString = '';
    var words;
    for (var i = 0; i < maxNum; ++i) {
        outputString = ''
        words = '';
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
        $("#output").append(outputString+"<br>");
    }
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