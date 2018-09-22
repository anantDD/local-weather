$(document).ready(function() {
  var latitude;
  var longitude;
  var url;
  var tempC;
  var tempF;
  var cityN;
  var i = 0;
  var Pos;
  var country;

  var geoSuccess = function(position) {
    Pos = position;
    latitude = Pos.coords.latitude;

    longitude = Pos.coords.longitude;

    url =
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
      latitude +
      "&lon=" +
      longitude;
    $.getJSON(url, function(json) {
      cityN = json.name;
      country = json.sys.country;

      $("#location").html(cityN + ", " + country);

      tempC = Math.round(json.main.temp * 100) / 100;
      tempF = (9 * tempC) / 5 + 32;

      $("#temperature").html(tempC);

      unitChange(tempF, tempC);
      imgChange(tempC);
      console.log(json);
    });
  };

  navigator.geolocation.getCurrentPosition(geoSuccess);
  if (navigator.geolocation) {
    console.log("Geolocation is supported!");
    //console.log(latitude);
  } else {
    console.log("Geolocation is not supported for this Browser/OS.");
  }

  function unitChange(tF, tC) {
    $("#unit").on("click", function() {
      if (i % 2 == 0) {
        $("#temperature").html(tF);
        $("#unit").html("&deg;F");
      } else {
        $("#temperature").html(tC);
        $("#unit").html("&deg;C");
      }
      i++;
    }); // end of CLICK
  }

  function imgChange(tC) {
    if (tC >= 30) {
      $("img").attr(
        "src",
        "https://res.cloudinary.com/dvsnoxmcd/image/upload/v1482485351/Hot_Weather_1920x1200_q0agke.jpg"
      );
    } else if (tC < 5) {
      $("img").attr(
        "src",
        "https://res.cloudinary.com/dvsnoxmcd/image/upload/v1482485135/Weather-Backgroundless_than_5_nqndi3.jpg"
      );
    }
  }
});
