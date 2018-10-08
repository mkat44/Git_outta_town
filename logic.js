
// api website for weather
// api.openweathermap.org/data/2.5/weather?q=cd6ea6b940f096174cde65479a31e8b5

// // API key for open weather app
// cd6ea6b940f096174cde65479a31e8b5

    $(document).ready(function(){

        $('#submitWeather').click(function(){
    
            var city = $("#city").val();
    
            if (city != ''){
    
                $.ajax({
                    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&appid=cd6ea6b940f096174cde65479a31e8b5",
                    type: "GET",
                    dataType: "jsonp",
                    success: function(data){
                        var widget = show(data);
                        $("#show").text(data.main.temp);
                        $("#show").html(widget);
    
                        $("#city").val('');
                    }

                });
            
                
            }else{
                $("#error").html('Field cannot be empty');
            }
        });
    });
    
    function show(data) {
        return "<h3><strong>Temperature</strong>: "+ data.main.temp +"</h3>"
    }

    
// below trying to add multiple parameters for weather
    
$("#weather").on("click", function() {
var searchKeyword = "Weather";
console.log(searchKeyword)
$("#WeatherEvents").empty();
var queryEB = "https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&appid=cd6ea6b940f096174cde65479a31e8b5",
type: "GET"

if (startDate < endDate)
$.ajax({
    url: queryEB,
    method: "Get"
}).then(function(response){
    console.log(response);
    for (i = 0; i < response/pagination.object_count; i++){
        var weather = results.weather.main;
        var weatherDescription = results.weather.description;
        var weatherTemp = results.main.temp;
        var weatherPressure = results.main.pressure;
        var weatherHumidity = results.main.humidity
        var weather = $("<tr>");
        var weatherdescriptionTD = $("<td>");
        var weatherTempTD = $("<td>");
        var weatherPressureTD = $("<td>");
        var weatherHumidityTD = $("<td>");
        $(weatherTD).append(weather);
        $(weatherDescriptionTD).append(weatherDescription);
        $(weatherTempTD).append(weatherTemp);
        $(weatherPressureTD).append(weatherPressure);
        
        $(weatherevent).append(weatherTD, weatherdescriptionTD, weatherTempTD, weatherPressureTD, weatherHumidity);
        var weatherTable = $("<table>");
        $(weatherTable).append(weather);
        $("#WeatherEvents").append(weatherTable);
}

}
