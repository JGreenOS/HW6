# HW6
API Weather stations

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

This project uses dynamically updated HTML, Bootstrap, local storage in the browser and the OpenWeatherMap API's.  API's include the daily forecast, the UV index lookup based on a translation of the city's assigned latitude and longitude and the 5 day forecast based on the 15:00 time point.

## Screenshot of completed app

https://github.com/JGreenOS/HW6/blob/master/screenshot%20of%20app%20for%20HW6.png

## Next Steps
In this assignment, I spent a great deal of time "reverse engineering" some sample code to deeply understand how all of the API parts and the dynamic html are working together. The script file represents specific comments related to this learning process. 
Improvements include adding "tool-tips" for the weather icons and to add any weather alerts (such as watches/warnings) for the potential traveler.




