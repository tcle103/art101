// Lab 16 - JSON and APIs
// Tien Le <ticale@ucsc.edu>
// 12/8/23


// proxy solution from here: https://stackoverflow.com/a/44232651
const proxy = "https://cors-anywhere.herokuapp.com/"
var latestNum;
var comicObj = {};


// initial ajax call settings that pull the latest version of xkcd and
// grab the latest issue number for setting up nav buttons
var initialAjax = {
    url: proxy + "https://xkcd.com/info.0.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
        latestNum = data.num;
        comicObj = data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
        console.log("You might need to activate temp access to cors-anywhere here: https://cors-anywhere.herokuapp.com/")
    }
}


// equivalent to "getAndPutData"
// inserts image, titles, and sets up nav buttons 
// according to issue numbers
function displayComic(data) {
    $("#title").empty();
    $("#comic").empty();

    $("#title").append(`<h3>#${data.num}: ${data.title}</h3>`);
    $("#comic").append(`<img id='comic' src="${data.img}" title="${data.alt}"/>`);
    if (data.num === latestNum) {
        $("#next-button").addClass("hidden");
        $("#prev-button").removeClass("hidden");
    }
    else if (data.num === 1) {
        $("#prev-button").addClass("hidden");
        $("#next-button").removeClass("hidden");
    }
    else {
        $("#prev-button").removeClass("hidden");
        $("#next-button").removeClass("hidden");
    }
}


// generates AJAX call settings for a given issue number
function genAjaxObj(comicNum) {
    return {
        url: proxy + "https://xkcd.com/"+comicNum+"/info.0.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            comicObj = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
            console.log("You might need to activate temp access to cors-anywhere here: https://cors-anywhere.herokuapp.com/")
        }
    }
}


// execution

// initial button - fetch comic via AJAX and then display!
$("#init-button").click(function(){
    $("#init-button").addClass("hidden");
    $.when($.ajax(initialAjax)).then(function () {
        displayComic(comicObj)
    });
})

// previous button - decrement issue number then
// regrab AJAX and display
$("#prev-button").click(function () {
    var newcomic = (comicObj.num - 1);
    $.when($.ajax(genAjaxObj(newcomic))).then(function () {
        displayComic(comicObj)
    });
})

// next button - increment issue number then
// regrab AJAX and display
$("#next-button").click(function () {
    var newcomic = (comicObj.num + 1);
    $.when($.ajax(genAjaxObj(newcomic))).then(function () {
        displayComic(comicObj)
    });
})