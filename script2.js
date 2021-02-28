//document ready
$(document).ready(function () {
    $("search-button").on("click", function () {
        let searchValue = $("#search-value").val();

        //search function
        //goWx(getCity);
        searchWeather(searchValue);
    
    });

    $(".history").on("click", "li", function () {
        //goWx($(this).text());
        searchWeather($(this).text());
    });
    //store previous city
    function makeRow(text) {
        let li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
    }
    //get data from weather Api

    function searchWeather(searchValue) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=detroit&appid=30049c8f20433b7c73fa958a79fbc68b&units=imperial",
            dataType: "json",
            success: function(data) {
                //history link goes here
                if(history.indexOf(searchValue) === -1) {
                    history.push(searchValue);
                    window.localStorage.setItem("history", JSON.stringify(history));

                    makeRow(searchValue);
                }
                //html content here
                var title = $("<h3>").addClass("card-title").text(data.name);
                var card = $("<div>").addClass("card");
                var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp);
                var wind = $("<p>").addClass("card-text").text("Wind" + data.wind.speed);
                var image = $("<img>").attr("src", "http://openweathermap.org/image/wn" + data.weather[0].icon + "@2x.png")
                //humidity

                title.append(image);
                cardBody.append(title, temp, wind);
                card.append(cardBody);
                $("#today").append(card);
            }

        })
    }




});
//end of the main function


// success: function(response) {
// if(history.indexof(searchCity) === -1) {
// history.pushState(searchCity);
// window.localStorage.setItem("history", JSON.stringify(history));
// }
// }
// })

//need to handle the response





//get weather data to html using cards

// var title = $("<h3>").addClass("card-title").text(data.name);
// var card = $("<div>").addClass("card");
// var temp = $("<p>").addClass("card-text").text("Temperature: "+ data.main.temp);
// var wind = $("<p>").addClass("card-text").text("Wind" + data.wind.speed);
// var image = $("<img>").attr("src", "http://openweathermap.org/image/wn" + data.weather[0].icon + "@2x.png")
//humidity



// // make weather appear on html
// title.append(image);
// cardBody.append(title, temp, wind)
// $("#today").append(card);

//forecast

//put on the page



//get UV index from API



//change color of UV buttons

//get history back
