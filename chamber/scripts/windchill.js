// Display current temperature, wind speed, and wind chill from San Antonio TX weather section, since Chacha is a fictional town. This function uses the OpenWeather API

var jsonData;

$(function () {
    
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=San-Antonio&APPID=d8b80212a11f7cffaca6a1ced52c249f', function(data) {
        jsonData = data;
        
        temp = (jsonData.main.temp - 273.15) * 9/5 + 32;
        wind = jsonData.wind.speed;
        
        windChill = (0.0817*(3.71*(Math.pow(wind, 0.5))+
5.81-0.25*wind)*(temp-91.4)+91.4);

        $('.temperature').text(temp.toFixed(1) + '°');
        $('.windSpeed').text('Wind speed: ' + wind + ' mph');
        if(temp<=50 && wind>3){
        	$('.windChill').text('Wind chill: ' + windChill.toFixed(1) + ' °F');
        } else {
        	$('.windChill').text('Wind chill: N/A');
        }
    });
});