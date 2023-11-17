// Lab 10 - Javascript for the Web
// Tien Le <ticale@ucsc.edu>
// 11/16/23



// generate random text function from Lab 10 page
function generateRandomText() {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const min = 3;
    const max = 100;
    const randLen = Math.floor(Math.random() * (max - min + 1)) + min;
    // Get a random starting index to slice the Lorem Ipsum text
    const randStart = Math.floor(Math.random() * (text.length - randLen + 1));
    // Generate the random Lorem Ipsum-like text
    return text.slice(randStart, randStart + randLen);
}

// button event listener
// this is a fake send button which doesn't have to actually deal with HTML submit things!
$("#send").click(userSubmit = function (e) {
    e.preventDefault(); // stops form from submitting on the enter variation

    var userInput = $("#user-input").val(); // get user input from text box
    if (userInput != "") {
        // handle user input
        console.log(userInput);  // print in console
        $("#user-input").val('') // clear
        $("#text-display").append(`<div class='user texts'>${userInput}</div>`); // append user input to texts

        // handle auto response
        var i = 0;
        var randNum = (Math.floor(Math.random() * 2)+1);
        while (i < randNum) {
            setTimeout(function (){
                var autoResponse = generateRandomText(); // generate random text
                $("#text-display").append(`<div class="auto texts">${autoResponse}</div><br>`); // append auto response
            }, 400)
            ++i;
        }
    }
    return;
})

$("#user-text").on("submit", userSubmit);