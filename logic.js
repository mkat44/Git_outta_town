
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

    

