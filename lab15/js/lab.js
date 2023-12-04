// Lab 15 - AJAX
// Tien Le <ticale@ucsc.edu>
// 12/3/23




// functions

function numberGen(name) {
  var total = 0;
  for (var i = 0; i < name.length; ++i) {
    if (name[i] != " ") {
      total += name.charCodeAt(i);
    }
  }
  var lessThan = total;
  while (lessThan >= 1) {
    lessThan /= 10; // make the total ascii code values of name < 1
    // so can use like random
  }
  return [total, Math.floor(lessThan * 981)]; // should work like random but with names, only up to clodsire...
}

function pokeDisplay(pokedata, id, b) {

  // name + nickname change form
  var name = pokedata.name.split("-")
  for (var i = 0; i < name.length; ++i) {
    name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
  }
  name = name.join("-");
  var gender = id % 2;
  var shiny = id % 4;
  console.log(name);
  $("#title").append(`<div id="pokename"><input type="text" id="nickname" minlength="1" size="10" value=${name} /><button id="namebutton">&#9998</button></div>`);
  if (gender === 1) {
    $("#title").append("<p id='gender'>&#9792</p>")
  }
  else {
    $("#title").append("<p id='gender'>&#9794</p>")
  }
  if (shiny == 3) {
    $("#title").append("<p title='Woah, a shiny!'>✧</p>");
  }
  $("#namebutton").on("click", function () {
    var nickname = $("#nickname").val();
    $("#pokename").toggleClass("hidden");
    $("#title").prepend(`<p id="pokenick">${nickname}</p>`);
  })


  // pick a sprite
  var sprite = '';
  gender = 0;
  if (pokedata.sprites.front_female) {
    gender = (id % 2) * 10;
  }
  console.log(shiny);
  switch (shiny + gender) {
    // not female, not shiny
    case 0:
    case 1:
    case 2:
      sprite = pokedata.sprites.front_default;
      break;
    // not female, shiny
    case 3:
      sprite = pokedata.sprites.front_shiny;
      break;
    // female, not shiny
    case 10:
    case 11:
    case 12:
      sprite = pokedata.sprites.front_female;
      break;
    // female, shiny
    case 13:
      sprite = pokedata.sprites.front_shiny_female;
      break;

  }

  // get text desc for tooltip
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon-species/"+b,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(sprite);
      try {
        $("#contents").prepend(`<div id="pokepic"><img src="${sprite}" title="${name+"\nThe "+data.genera[7].genus}" /></div>`);
      }
      catch {
        $("#contents").prepend(`<div id="pokepic"><img src="${sprite}" title="${name}" /></div>`);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // do stuff
      console.log("Error:", textStatus, errorThrown);
    }
  });
  

  // held item
  $("#pokepic").append("<div id='status'></div>");
  if (pokedata.held_items.length > 0) {
    if ((id % 5) == 2) {
      var held_item = pokedata.held_items[id % pokedata.held_items.length];
      var held_item_name = held_item.item.name.split("-").join(" ")
      var held_item_name = held_item_name[0].toUpperCase() + held_item_name.slice(1);
      console.log(held_item_name);
      var held_item_desc = "";
      var held_item_img;


      var hiEndpoint = `${held_item.item.url}`
      $.ajax({
        url: hiEndpoint,
        type: "GET",
        dataType: "json",
        success: function (data) {
          console.log(data);
          held_item_desc = data.effect_entries[0].short_effect;
          held_item_img = data.sprites.default;
          $("#status").append(`<img src="${held_item_img}" title="${held_item_name+"\n"+held_item_desc}" />`);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // do stuff
          console.log("Error:", textStatus, errorThrown);
        }
      });
    }
  }

  // characteristic/nature
  $("#contents").append("<div id='poketext'></div>");
  var natureid = id % 30;
  $.ajax({
    url: "https://pokeapi.co/api/v2/characteristic/"+natureid,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      var natdesc = data.descriptions[7].description;
      console.log(natdesc);
      $("#poketext").append(`<p>${natdesc}</p>`);
      $("#poketext").append(`<div id="lvl"><p>Met at </p><p class="blue">Lv.${(id%10)+1}</p></div>`);
      $("#poketext").append(`<p id="types"></p>`);
      for (var i = 0; i < pokedata.types.length; ++i) {
        var typename = pokedata.types[i].type.name;
        typename = typename[0].toUpperCase()+typename.slice(1)
        $("#types").append(`${typename}-type`);
        if (i != pokedata.types.length-1) {
          $("#types").append(", ");
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // do stuff
      console.log("Error:", textStatus, errorThrown);
    }
  });

 

}

function heldItemFinder(pokedata, id) {


  var held_item_obj = { name: held_item_name, desc: '', img: '' };




  return held_item_obj;
}



// execution stuff

$("#entry").on("submit", function (e) {
  e.preventDefault(); // stop form from submitting
  $("#title").empty();
  $("#contents").empty();

  // generate pokemon from name entry
  var name = $("#name").val();
  var nums = numberGen(name);
  console.log(name, nums[1]);

  var endpoint = "https://pokeapi.co/api/v2/pokemon/"

  $.ajax({
    url: endpoint + nums[1],
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      pokeDisplay(data, nums[0], nums[1]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // do stuff
      console.log("Error:", textStatus, errorThrown);
    }
  });

});

