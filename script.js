//document ready
$( document ).ready(function() {
$("search-button").on("click", function () {
var searchCity = $("#search-city").val ();

//search function
goWeather(searchCity);
});
});


//store previous city
$(".history").on("click", "li", function () {
goWeather($(this).text());
});

function showStuff(text) {
    var li = $("<li>").addClass("list-group-item").text(text); $(".history").append(li);
}

//get data from weather Api
function goWeather(searchCity) {
$.ajax({
type: "GET",
url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=30049c8f20433b7c73fa958a79fbc68b&units=imperial",
dataType: "json",
success: function(data) {
if(history.indexof(searchCity) === -1) {
history.pushState(searchCity);
window.localStorage.setItem("history", JSON.stringify(history));
}
}
})




//get weather data to html using cards

var title = $("<h3>").addClass("card-title").text(data.name);
var card = $("<div>").addClass("card");
var temp = $("<p>").addClass("card-text").text("Temperature: "+ data.main.temp);
var wind = $("<p>").addClass("card-text").text("Wind" + data.wind.speed);
var image = $("<img>").attr("src", "http://openweathermap.org/image/wn" + data.weather[0].icon + "@2x.png")
//humidity



// make weather appear on html
title.append(image);
cardBody.append(title, temp, wind)
$("#today").append(card);

//forecast

//put on the page



//get UV index from API



//change color of UV buttons

//get history back
}
