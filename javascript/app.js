// Wikipedia link generator
 
 // First we start by creating the variables that we need.  For this case, we have city, which is the city input
 // by the user, we have link, which is the base link for all wiki articles.
 var city  = "";
 var link  = "https://en.wikipedia.org/wiki/"
 var state = ""
 var startDate = ""
 var endDate = ""
 var searchLON = ""
 var searchLAT = ""
 var searchTerm

 var mapDisplay = false

 // Setting up the current date to check to make sure the startDate >= the current date
 var today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth()+1;
 var yyyy = today.getFullYear();

 if(dd<10) {
    dd = '0'+dd
 } 

 if(mm<10) {
    mm = '0'+mm
 } 

today = yyyy + '-' + mm + '-' + dd + "T00:00:00";
console.log(today)

// Here we get the values of the input forms and assign them to the city and state variables to be displayed.
 window.onload = function(){
     $('.parallax').parallax();
     $('.collapsible').collapsible();
     $('.collapsibleDiv').hide();
     $("#contentHeader").hide();
     $("#mainContent").hide();
     $("#searchButton").click(function(){

        console.log($("#firstDate").val(), $("#secondDate").val())
        startDate = $("#firstDate").val() + "T00:00:00"
        endDate   = $("#secondDate").val() + "T00:00:00"
        console.log(startDate)
        console.log(endDate)
        if (startDate > endDate || startDate < today) {
            // Put the user text here saying invalid date
            console.error("ERROR:  Invalid date entered!")
        }
        else {
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
        city  = $("#searchBar").val().trim();
        state = $("#searchState").val().trim();
        // Making the cities first character uppercase and making state all uppercase.
        city = city.toLowerCase()
        city = city.charAt(0).toUpperCase() + city.slice(1)
          
        var arr = []

        city = city.replace("-", " - ")

        console.log(city)

        function capitalize(str) {
            var sep = str.split(" ")
            console.log(sep)
            for (i=0; i<sep.length; i++) {
                arr.push(sep[i][0].toUpperCase()+sep[i].slice(1))
                console.log(arr)
            }
            return arr.join(" ")
        }
        city = capitalize(city)
        state = state.toUpperCase()

        var fullLink = link + city + ", " + state
        console.log(fullLink)
        city = city.replace(" - ", "-")
    


        if (state.length === 2){
            state = state.toUpperCase()
        }
        else {
            state = state.toLowerCase()
            state = state.charAt(0).toUpperCase() + state.slice(1)
        }
        
          var fullLink = link + city + ", " + state
         console.log(fullLink)
         // Assigning the start and end date to use in the other API's for events
        
        
        $('<div>', {
            id: 'wikiLinkHolder'
        }).append( $('<div>', {
            id: 'wikiLink'
        })).append("<a class='waves-effect waves-light btn light-green' href = '" + fullLink + "'>"+ "Wikipedia").appendTo("#buttonDiv");


        $("#cityName").text(city + ", " + state);


    searchTerm = city + "+" + state


    // eventbrite
    // Need new on click function here.
    // needs dates formatted as YYYY-MM-DD+T+HH:MM:SS
    // doesn't currently return anything but a console log; working on pulling out relevant info now

    $("#musicRow").on("click", function() {
        // placeholder for keyword to filter searches by
    var searchKeyword = "Music";
    console.log(searchKeyword)
    $("#musicEvents").empty();
    var queryEB = "https://www.eventbriteapi.com/v3/events/search/?q=" + searchKeyword + "&location.address=" + searchTerm + "&start_date.range_start=" + startDate + "&start_date.range_end=" + endDate + "&token=JYNTN4DWJF75I4XR2WTL";

    $.ajax({
        url: queryEB,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (i = 0; i < response.pagination.object_count; i++) {
            var eventName = response.events[i].name.text;
            var eventLink = "<a href='" + response.events[i].url + "' + target='_blank'><button>More Info</button></a>";
            var eventDate = moment(response.events[i].start.local).format("MM/DD/YYYY");
            var eventTime = moment(response.events[i].start.local, "HH:mm:ss").format("hh:mm a");
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
            var eventTable = $("<table>");
            $(eventTable).append(event);
            $("#musicEvents").append(eventTable);
        }
    })

})

$("#foodDrinkRow").on("click", function() {
    // placeholder for keyword to filter searches by
var searchKeyword = "Food and Drink";
console.log(searchKeyword)
$("#foodDrinkEvents").empty();
var queryEB = "https://www.eventbriteapi.com/v3/events/search/?q=" + searchKeyword + "&location.address=" + searchTerm + "&start_date.range_start=" + startDate + "&start_date.range_end=" + endDate + "&token=JYNTN4DWJF75I4XR2WTL";

$.ajax({
    url: queryEB,
    method: "GET"
}).then(function(response) {
    console.log(response);
    for (i = 0; i < response.pagination.object_count; i++) {
        var eventName = response.events[i].name.text;
        var eventLink = "<a href='" + response.events[i].url + "' + target='_blank'><button>More Info</button></a>";
        var eventDate = moment(response.events[i].start.local).format("MM/DD/YYYY");
        var eventTime = moment(response.events[i].start.local, "HH:mm:ss").format("hh:mm a");
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
        var eventTable = $("<table>");
        $(eventTable).append(event);
        $("#foodDrinkEvents").append(eventTable);
    }
})

})

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
    $("#socialEvents").empty();
    var queryMeetup = "https://api.meetup.com/find/upcoming_events/?key=50714b3e1a91d102f757e2e3b466057&start_date_range=" + startDate + "&end_date_range=" + endDate + "&lat=" + searchLAT + "&lon=" + searchLON;

if (startDate < endDate && startDate >= today) {
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
            var eventLink = "<a class='waves-effect waves-light btn light-green' style='float:right;'href='" + response.events[i].link + "' + target='_blank'>" + 'Link' + "</a>";

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
            var eventTable = $("<table>");
            $(eventTable).append(event);
            $("#socialEvents").append(eventTable);
        }
    })
}
else {
    console.error("ERROR: Invalid date!")
}
})
    // mapquest key j1jNtHV0DbGZt1TOQg8rFdnvuzK3BBNH

    displayAuxBox();

    // Displays the mapquest button inside of a div called auxBox
    function displayAuxBox(){
        // Creates div
        var auxBox = $("<div id = aux-box>");

        // Prepares state and city for url link if there are no spaces in city
        var lowerState = state.toLowerCase();
        hyphenCity = city;
        delimiterCity = city;
        // If there are spaces in city, calls delimitCity to replace them with "-" or "%20"
        var patt = /\s/;
        if (patt.test(city) == true) {

            hyphenCity = delimitCity("-").toLowerCase();
            delimiterCity = delimitCity("%20");

        }
        // mapquest url
        mapUrl = "https://www.mapquest.com/search/results?slug=%2Fus%2F"+lowerState+"%2F"+hyphenCity+"&query="+delimiterCity+",%20"+state+"&page=0";
        // If this is the first search, a new button is created and appended to auxBox, which is appended to mainContent
        if (mapDisplay == false){

            var mapButton = $("<a href='"+mapUrl+"' id=map-button class=aux-stuff target='_blank'><button type=submit>mapquest</button></a>");

            auxBox.html(mapButton);

            $("#mainContent").append(auxBox);

            mapDisplay = true;

        }
        else {
            // Else the original button is updated with a new url
            $("#map-button").attr("href", mapUrl);
        }
    }

    // If the city has spaces, replaces them with the "-" or "%20" delimeter for the mapquest url link
    function delimitCity(del){
        var tempCity = "";
        for (var i = 0; i < arr.length-1; i++) {
            tempCity = tempCity.concat(arr[i].concat(del));
        }
        tempCity = tempCity.concat(arr[arr.length-1]);
        return tempCity
    }


    

    // Sets up a click handler for selecting the sports tab
   $(document).on("click", "#sportsRow", fetchEvents);
   // Sets up a click handler for selecting the theatre tab
   $(document).on("click", "#theaterRow", fetchEvents);

   $("#sportsRow").val("sports")
   $("#theaterRow").val("theatre");
    // Fetches the data from ticketmaster
    function fetchEvents(){
        // Retrieves the event type, either sports or theatre
        var eventType = $(this).val();

        
        console.log("event = " + eventType);

        // Gets the input data from the DOM
        var eventStartDate = startDate.slice(0, 10);
        console.log(eventStartDate);
        var eventEndDate = endDate.slice(0, 10);
        console.log(eventEndDate);
        console.log("cityName = " + city);
        // Sets up the query url based on the input data and event type
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&stateCode=" + state + "&startDateTime=" + eventStartDate +"T00%3A00%3A00Z&endDateTime=" + eventEndDate + "T23%3A59%3A00Z&keyword=" + eventType + "&sort=date,asc&apikey=FJe0EUZsiu36JGLaKJ0OTRG6MUalTIbh";
        //Makes the API call
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {

            var results = response._embedded;
            // Calls the function to display the API results
            displayEvents(results,eventType);

            console.log(results);
            
        });
    }
    // Displays the API results in a table
    function displayEvents (results,eventType){
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
            if (eventType == "sports"){
                $("#sportsTable").append(eventtr);
            }
            else if (eventType == "theatre"){
                $("#theaterTable").append(eventtr);
            }
        }

    };
    };
})
}