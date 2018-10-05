// Wikipedia link generator
 
 // First we start by creating the variables that we need.  For this case, we have city, which is the city input
 // by the user, we have link, which is the base link for all wiki articles.
 var city  = ""
 var link  = "https://en.wikipedia.org/wiki/"
 var state = ""
 var startDate = ""
 var endDate = ""
 var searchLON 
 var searchLAT
 var searchTerm
// Here we get the values of the input forms and assign them to the city and state variables to be displayed.
 window.onload = function(){
     $('.parallax').parallax();
     $('.collapsible').hide();
     $("#searchButton").click(function(){
         $('.collapsible').show();
         // Setting the city and state variables
        city  = $("#searchBar").val()
        state = $("#searchState").val()
        // Making the cities first character uppercase and making state all uppercase.
        city = city.toLowerCase()
        city = city.charAt(0).toUpperCase() + city.slice(1)
        function capitalize(str) {
            var arr = []
            var sep = str.split(" ")
            for (i=0; i<sep.length; i++) {
                arr.push(sep[i][0].toUpperCase()+sep[i].slice(1))
            }
            return arr.join(" ")
        }
        city = capitalize(city)
        state = state.toUpperCase()
        

        var fullLink = link + city + ", " + state
        console.log(fullLink)

    


        if (state.length === 2){
            state = state.toUpperCase()
        }
        else {
            state = state.toLowerCase()
            state = state.charAt(0).toUpperCase() + state.slice(1)
        }
        
          var fullLink = link + city + ", " + state
         console.log(fullLink)

        $('<div>', {
            id: 'wikiLinkHolder'
        }).append( $('<div>', {
            id: 'wikiLink'
        })).append("<a href = '" + fullLink + "'>"+fullLink).appendTo("#mainContent")
        // Assigning the start and end date to use in the other API's for events
        console.log($("#firstDate").val(), $("#secondDate").val())
        startDate = $("#firstDate").val() + "T00:00:00"
        endDate   = $("#secondDate").val() + "T00:00:00"
    
    




    searchTerm = city + "+" + state
    // mapquest geolocation api
    // takes city,state and gives us lat/lon for other apis
    // This code will be called as soon as the Search button is clicked in order to assign those variables.

        var queryLocation = "http://www.mapquestapi.com/geocoding/v1/address?key=QxUvIdV0SxYVrEFvZBdqCWOBVABMZZkd&location=" + searchTerm;
        
        $.ajax({
            url: queryLocation,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            searchLAT = response.results[0].locations[0].latLng.lat;
            searchLON = response.results[0].locations[0].latLng.lng;
            
        })
    });


    // meetup
    // Need new on click function here
    // needs dates formatted as YYYY-MM-DD+T+HH:MM:SS
    // needs cities as LON (longitude) & LAT (latitude)
    // doesn't currently return anything but a console log; working on pulling out relevant info now
    // This code won't be called until it is told to.  So uppon the click of a button
        var queryMeetup = "https://api.meetup.com/find/upcoming_events/?key=50714b3e1a91d102f757e2e3b466057&start_date_range=" + startDate + "&end_date_range=" + endDate + "&lat=" + searchLAT + "&lon=" + searchLON;

        $.ajax({
            url: queryMeetup,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        })
    // eventbrite
    // Need new on click function here.
    // needs dates formatted as YYYY-MM-DD+T+HH:MM:SS
    // doesn't currently return anything but a console log; working on pulling out relevant info now
    var queryEB = "https://www.eventbriteapi.com/v3/events/search/?q=" + searchTerm + "&start_date.range_start=" + startDate + "&start_date.range_end=" + endDate + "&token=JYNTN4DWJF75I4XR2WTL";


    $.ajax({
        url: queryEB,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })

}
