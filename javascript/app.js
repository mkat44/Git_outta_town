// Wikipedia link generator
 
 // First we start by creating the variables that we need.  For this case, we have city, which is the city input
 // by the user, we have link, which is the base link for all wiki articles.
 var city  = ""
 var link  = "https://en.wikipedia.org/wiki/"
 var state = ""
 var startDate = ""
 var endDate = ""
 var searchLON = ""
 var searchLAT = ""
 var searchTerm
// Here we get the values of the input forms and assign them to the city and state variables to be displayed.
 window.onload = function(){
     $('.parallax').parallax();
     $('.collapsible').collapsible();
     $('.collapsibleDiv').hide();
     $("#contentHeader").hide();
     $("#mainContent").hide();
     $("#searchButton").click(function(){
        $("#contentHeader").show();
        $("#mainContent").show();
        $("#buttonDiv").text("");
        displayEventBox();
        function displayEventBox(){

        var eventBox = $("<div class = event-box>");

        $("#mainContent").append(eventBox);

        }
         $('.collapsibleDiv').show();
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
        })).append("<a class='waves-effect waves-light btn light-green' href = '" + fullLink + "'>"+ "Wikipedia").appendTo("#buttonDiv");

        // Assigning the start and end date to use in the other API's for events
        console.log($("#firstDate").val(), $("#secondDate").val())
        startDate = $("#firstDate").val() + "T00:00:00"
        endDate   = $("#secondDate").val() + "T00:00:00"
        console.log(startDate)
        console.log(endDate)
        
        $("#cityName").text(city + ", " + state);

// placeholder for keyword to filter searches by
    var searchKeyword = $(".collapsible-header").val();

    searchTerm = city + "+" + state
    // mapquest geolocation api
    // takes city,state and gives us lat/lon for other apis
    // This code will be called as soon as the Search button is clicked in order to assign those variables.

 


    // meetup
    // Need new on click function here
    // needs dates formatted as YYYY-MM-DD+T+HH:MM:SS
    // needs cities as LON (longitude) & LAT (latitude)
    // doesn't currently return anything but a console log; working on pulling out relevant info now
    // This code won't be called until it is told to.  So uppon the click of a button
        
    // eventbrite
    // Need new on click function here.
    // needs dates formatted as YYYY-MM-DD+T+HH:MM:SS
    // doesn't currently return anything but a console log; working on pulling out relevant info now

    var queryEB = "https://www.eventbriteapi.com/v3/events/search/?q=" + searchTerm + "&start_date.range_start=" + startDate + "&start_date.range_end=" + endDate + "&token=JYNTN4DWJF75I4XR2WTL";

if (startDate < endDate)
    $.ajax({
        url: queryEB,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (i = 0; i < response.pagination.object_count; i++) {
            var eventName = response.events[i].name.text;
            var eventLink = response.events[i].url;
            var eventDate = moment(response.events[i].start.local).format("MM/DD/YYYY");
            var eventTime = moment(response.events[i].start.local).format("hh:mm a");
            var eventLocation = response.events[i].venue_id;
            var eventVenue = "";
            var queryEvent = "https://www.eventbriteapi.com/v3/venues/" + eventLocation + "/?token=JYNTN4DWJF75I4XR2WTL";

            $.ajax({
                url: queryEvent,
                method: "GET"
            }).then(function(response) {
                var eventVenue = response.address.address_1;
            });

            var event = $("<tr>");
            var eventDateTD = $("<td>");
            var eventTimeTD = $("<td>");
            var eventNameTD = $("<td>");
            var eventLocationTD = $("<td>");
            var eventLinkTD = $("<td>");
            $(eventDateTD).append(eventDate);
            $(eventTimeTD).append(eventTime);
            $(eventNameTD).append(eventName);
            $(eventLocationTD).append(eventVenue);
            $(eventLinkTD).append(eventLink);
            $(event).append(eventDateTD, eventNameTD, eventLocationTD, eventLinkTD);
        }
    })
else {
    console.log("ERROR: Start date is further than end date")
}

// mapquest geolocation api
// takes city,state and gives us lat/lon for other apis

    var queryLocation = "http://www.mapquestapi.com/geocoding/v1/address?key=QxUvIdV0SxYVrEFvZBdqCWOBVABMZZkd&location=" + searchTerm;


    $.ajax({
        url: queryLocation,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        searchLAT = response.results[0].locations[0].latLng.lat;
        searchLON = response.results[0].locations[0].latLng.lng;
        searchLAT = searchLAT.toString()
        searchLON = searchLON.toString()
        console.log(searchLAT, searchLON);
    })

// meetup
// needs dates formatted as YYYY-MM-DD+T+HH:MM:SS
// needs cities as LON (longitude) & LAT (latitude)
// doesn't currently return anything but a console log; working on pulling out relevant info now

$("#socialRow").on("click", function() {
    var queryMeetup = "https://api.meetup.com/find/upcoming_events/?key=50714b3e1a91d102f757e2e3b466057&start_date_range=" + startDate + "&end_date_range=" + endDate + "&lat=" + searchLAT + "&lon=" + searchLON;

if (startDate < endDate) {
    $.ajax({
        url: queryMeetup,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (i = 0; i < response.events.length; i++) {
            var eventName = response.events[i].name;
            var eventDate = moment(response.events[i].local_date).format("MM/DD/YYYY");
            var eventTime = moment(response.events[i].local_time, "HH:mm:ss").format("hh:mm a");
            var eventLocation = response.events[i].venue.address_1;
            var eventLink = response.events[i].link;

            var event = $("<tr>");
            var eventDateTD = $("<td>");
            var eventTimeTD = $("<td>");
            var eventNameTD = $("<td>");
            var eventLocationTD = $("<td>");
            var eventLinkTD = $("<td>");
            $(eventDateTD).append(eventDate);
            $(eventTimeTD).append(eventTime);
            $(eventNameTD).append(eventName);
            $(eventLocationTD).append(eventLocation);
            $(eventLinkTD).append(eventLink);
            $(event).append(eventDateTD, eventNameTD, eventLocationTD, eventLinkTD);
            $("#socialEvents").append(event);
        }
    })
}
else {
    console.log("ERROR:  Start date is further than end date!")
}
})
   $(document).on("click", "#sportsEvents", fetchEvents);
   // Sets up a click handler for selecting the theatre tab
   $(document).on("click", "#theatreEvents", fetchEvents);

    // Fetches the data from ticketmaster
    function fetchEvents(){
        // Retrieves the event type, either sports or theatre
        var event = $(this).attr("value");

        console.log("event = " + event);

        // Gets the input data from the DOM

        console.log("cityName = " + cityName);
        // Sets up the query url based on the input data and event type
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityName + "&stateCode=" + stateName + "&startDateTime=" + startDate +"T00%3A00%3A00Z&endDateTime=" + endDate + "T23%3A59%3A00Z&keyword=" + event + "&sort=date,asc&apikey=FJe0EUZsiu36JGLaKJ0OTRG6MUalTIbh";
        //Makes the API call
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {

            var results = response._embedded;
            // Calls the function to display the API results
            displayEvents(results,event);

            console.log(results);
            
        });
    }
    // Displays the API results in a table
    function displayEvents (results,event){
        // Loops through the results array
        for (var i = 0; i < results.events.length; i++) {
            
            console.log(results.events[i].dates.start.localDate);
            console.log(results.events[i].dates.start.localTime);
            console.log(results.events[i].name);
            console.log(results.events[i]._embedded.venues[0].name);
            console.log(results.events[i].url);

            // Converts date and time
            var eventDateConverted = moment(results.events[i].dates.start.localDate).format("MM/DD/YYYY");
            var eventTimeConverted = moment(results.events[i].dates.start.localTime,"HH:mm:ss").format("hh:mm a");
            // Creates a button inside of the table for more info
            var moreInfoButton = $("<a href='"+results.events[i].url+"' target='_blank'><button class=more-info-button type=submit>More Info</button></a>")
            // Creates a new row in the table
            var eventtr = $("<tr>");
            // Creates a new td for each category of data
            var eventDate = $("<td>").html(eventDateConverted);
            var eventTime = $("<td>").html(eventTimeConverted);
            var eventName = $("<td>").html(results.events[i].name);
            var eventLocation = $("<td>").html(results.events[i]._embedded.venues[0].name);
            var eventLink = $("<td>").html(moreInfoButton);
            // Appends the new tds to the row
            eventtr.append(eventDate);
            eventtr.append(eventTime);
            eventtr.append(eventName);
            eventtr.append(eventLocation);
            eventtr.append(eventLink);            
            // Based on weather the sports tab or theatre tab was selected, appends new row to table
            if (event == "Sports"){
                $("#sportsTable").append(eventtr);
            }
            else if (event == "Theatre"){
                $("#theatreTable").append(eventtr);
            }
        }

    };
    });
 }