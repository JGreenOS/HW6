//line 2 is a named JQuery function to wait to execute any script until the page is loaded AND sets the main function
$(document).ready(function () {
  //line 4 uses JQuery to find the button id on the index page and when this button is clicked call the unnamed function
  $("#search-button").on("click", function () {
    //line 6 sets the initial variable to hold the city name the .val gets the input from the button
    let searchValue = $("#search-value").val();
    //line 8 calls the searchWeather function passing the city name in the searchValue variable
    searchWeather(searchValue);
    //line 10 closes the anonymous function, closes the click event handler and ends the statement.
  });
  //line 12 starts the JQuery for the history element on the html page, starts the event handler and is being passed the li parameter. It also opens an anonymous function.
  $(".history").on("click", "li", function () {
    //line 14 uses the output from the function searchWeather and hits the API again.  Line 15 closes this function, closes the click event handler and ends the statement.
    searchWeather($(this).text());
  });


  //The function makeRow calls the parameter of text, sets the variable of li which is used to create a JQuery looking for the html element li.  The addClass appends the next 2 items, list-group-item and list-group-item-action to the li text and displays the text of the li element. The list-group-item-action sets the focus for this element. This function also appends the li element to the history element in the html.
  function makeRow(text) {
    let li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }


  //The searchWeather function is the core of the script. It is passing the parameter from the searchValue variable to an ajax call using the get command. The URL is concatenated with the api subdomain on openweathermap.org, the searchValue variable and my openweathermap.org api id. It also returns the units in the "imperial" format which is the default for most of the United States. The response is set to the JSON data type.  When successful, the if statement looks to see if the city exists in the history list already that is in the local window storage. If the city exists, it does not make a duplicate. If the city does not exist in the history array, the searchValue is added to the end of the array. The data is also "stringified". Then the makeRow function is called to display the city name in the history li element.
  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=30049c8f20433b7c73fa958a79fbc68b&units=imperial",
      dataType: "json",
      success: function (data) {
        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));

          makeRow(searchValue);
        }

        // clear any old content
        $("#today").empty();

        // These variables set the data from the city name returned in the JSON data into the bootstrap cards. The .addClass targets a specific part of the card (title, text) and concatenates the data and then adds a unit to the value for clear interpretation by the user. The Date() function gets the local date using the locale on my computer. The icon is called from the API and appends a .png value and is displayed in the image area of the card. 
        let title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        let card = $("<div>").addClass("card");
        let wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        let humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        let temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        let cardBody = $("<div>").addClass("card-body");
        let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        //Aftar all of the data are gathered, the .append is used to join the data to the correct area of the bootstrap card. All of these are limited to the #today element id in the html.
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);

        //After the card is populated with the image/icon, title of the city, date, temperature, humidity and wind speed, the function to getForecast using another API call and get UV Index for the current city are called. Note that the UV index is pulled from the second API call's response data using the latitude and longitude translated from the searchValue input.
        getForecast(searchValue);
        getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }
  //The getForecast function re-uses the parameter from the searchValue and makes another API call using ajax. The URL is derived from concatenating the base URL, the searchValue, and my openweathermap.org api id, returning in imperial units again (for consistency). The returned data set includes 40 items, with 8 specific time elements, representing a forecast for every 3 hours. When the data is returned successfully, the data set is queried to find the date time stamp of 15:00:00 (3pm). The data list is then set in variables for the forecast cards. 
  function getForecast(searchValue) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=30049c8f20433b7c73fa958a79fbc68b&units=imperial",
      dataType: "json",
      success: function (data) {
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            //these variables format the bootstrap card data.  The column in line 74 sets the bootstrap layout to 2 columns for a medium layout. The card variable in line 75 sets the card's background color to blue and the text to white. Line 76 adds padding between the card bodies using the spacing utlities in bootstrap. 
            let col = $("<div>").addClass("col-md-2");
            let card = $("<div>").addClass("card bg-primary text-white");
            let body = $("<div>").addClass("card-body p-2");
            //Like in the today card, the title is set for the card using the date from the response data in the dt_text field. The weather image is set from a concatenation of the weather icon and the image is placed in the image placeholder defined in the bootstrap card. Line 81 and 82 get the data from the forecast data response and formats it into the card text area.  
            let title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());

            let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

            let p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
            let p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

            //The column variable defined in line 74 uses the .append insertion method to build the body/text for all 5 cards (5 days of data at 15:00 each day). The jQuery returned 5 sets of data, so all are populated into cards. 
            col.append(card.append(body.append(title, img, p1, p2)));
            $("#forecast .row").append(col);
          }
        }
      }
    });
  }

  //This is the getUVIndex function, passing the latitude and longitude identiifed in the FIRST api call for the current conditions, then creates another API call to get the ultraviolet index as a number. The URL is concatenated with my openweathermap.org api id and the returned data are set in the uv variable. Finally, a samll bootstrap default button is displayed with the text of the button from the uv variable. 
  function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/uvi?appid=30049c8f20433b7c73fa958a79fbc68b&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function (data) {
        let uv = $("<p>").text("UV Index: ");
        let btn = $("<span>").addClass("btn btn-sm").text(data.value);

        //This if statement looks at the value of the button and changes the color based on the value using the basic Bootstrap button colors of success (green), warning (yellow) and danger (red). 
        if (data.value < 3) {
          btn.addClass("btn-success");
        }
        else if (data.value < 7) {
          btn.addClass("btn-warning");
        }
        else {
          btn.addClass("btn-danger");
        }
//When line 115 is run, the information from the getUV function appends the text from the uv variable to the end of the card with the element id of "today"
        $("#today .card-body").append(uv.append(btn));
      }
    });
  }

  //This is where the history variable is defined and is initially populated with an empty array. The key is "history" and the value will be the stringified name of the city entered by the user. If history exists, it will loop over the array and call the makeRow function from line 19. 
  let history = JSON.parse(window.localStorage.getItem("history")) || [];

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
}); //This ends the main function (which is anonymous) with 4 nested functions of searchWeather, makeRow, getForecast and getUVIndex.
