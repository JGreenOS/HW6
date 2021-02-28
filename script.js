//document ready
$( document ).ready(function() {
$("search-button").on("click", function () {
var searchCity = $("#search-city").val ();
$("#search-city".val("");
//search function
goWeather(searchCity);
});



}



//store previous city

//get data from weather Api
function findWeather(searchCity) {
$.ajax({
type: "GET",
url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=30049c8f20433b7c73fa958a79fbc68b&units=imperial",
dataType: "json",
success: function(data)
if(history.indexof(searchCity) === -1) {
    history.pushState(searchCity);
    window.localStorage.setItem("history", JSON.stringify(history));

}



//get weather data to html



// make weather appear on html


//forecast

//put on the page



//get UV index from API



//change color of UV buttons

//get history back

