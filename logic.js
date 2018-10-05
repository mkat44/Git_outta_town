
// api website for weather
// api.openweathermap.org/data/2.5/weather?q=cd6ea6b940f096174cde65479a31e8b5

// // API key for open weather app
// cd6ea6b940f096174cde65479a31e8b5

// var key = "cd6ea6b940f096174cde65479a31e8b5";
// var city = "YOUR CITY"; // My test case was "London"
// var url = "https://api.openweathermap.org/data/2.5/forecast?";

// $.ajax({
//   url: url, //API Call
//   dataType: "json",
//   type: "GET",
//   data: {
//     q: city,
//     appid: key,
//     units: "metric",
//     cnt: "10"
//   },
//   success: function(data) {
//     console.log('Received data:', data) // For testing
//     var wf = "";
//     wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
//     $.each(data.list, function(index, val) {
//       wf += "<p>" // Opening paragraph tag
//       wf += "<b>Day " + index + "</b>: " // Day
//       wf += val.main.temp + "&degC" // Temperature
//       wf += "<span> | " + val.weather[0].description + "</span>";
      
//     });
//     $("#showWeatherForcast").html(wf);
//   }
// });

 
    $(document).ready(function(){

        $('#submitWeather').click(function(){
    
            var city = $("#city").val();
    
            if (city != ''){
    
                $.ajax({
                    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&precipitation" + "&appid=cd6ea6b940f096174cde65479a31e8b5",
                    type: "GET",
                    dataType: "jsonp",
                    success: function(data){
                        var widget = show(data);
    
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

    

