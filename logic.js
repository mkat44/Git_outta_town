
// api website for weather
// api.openweathermap.org/data/2.5/weather?q={city name}

// // API key for open weather app
// cd6ea6b940f096174cde65479a31e8b5

// logic for city weather
$(document).ready(function(){

    // var city = "54901";
    var key = "id=cd6ea6b940f096174cde65479a31e8b5";
    
    $(".btn").on("click", function(){
      var city = document.getElementById("city").value
    
      var api = "http://api.openweathermap.org/data/2.5/weather?city=" + city + ",us" + "&" + key;  
      console.log("Before JSON"); //Works
      console.log(api); //Copy & Paste into browser works
      $.getJSON(api, function(data){
        console.log("JSON fired => ", data); //Doesn't Log
      }).fail(function(jqxhr, textStatus, error){
        console.log('Error:', textStatus, error)
      });  
    }); 
    
    $(".btn").on("click", function(){
        var state = document.getElementById("city").value
      
        var api = "http://api.openweathermap.org/data/2.5/weather?state=" + state + ",us" + "&" + key;  
        console.log("Before JSON"); //Works
        console.log(api); //Copy & Paste into browser works
        $.getJSON(api, function(data){
          console.log("JSON fired => ", data); //Doesn't Log
        }).fail(function(jqxhr, textStatus, error){
          console.log('Error:', textStatus, error)
        });  
      }); 
  });


// 

