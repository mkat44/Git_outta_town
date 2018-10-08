$(document).ready(function() {

// ticketmaster consumer key FJe0EUZsiu36JGLaKJ0OTRG6MUalTIbh
    
    $(document).on("click", "#searchButton", displayEventBox);

    function displayEventBox(){

        var eventBox = $("<div class = event-box>");

        var sportsButton = $("<input id=sportsEvents class=eventH type=submit value=Sports>");
        var theatreButton = $("<input id=theatreEvents class=eventH type=submit value=Theatre>");

        eventBox.append(sportsButton);
        eventBox.append(theatreButton);

        $("#mainContent").append(eventBox);

    }

   // Sets up a click handler for selecting the sports tab
   $(document).on("click", "#sportsEvents", fetchEvents);
   // Sets up a click handler for selecting the theatre tab
   $(document).on("click", "#theatreEvents", fetchEvents);

    // Fetches the data from ticketmaster
    function fetchEvents(){
        // Retrieves the event type, either sports or theatre
        var event = $(this).attr("value");

        console.log("event = " + event);

        // Gets the input data from the DOM
        cityName = $("#searchBar").text();
        stateName = $("#searchState").text();
        startDate = $("#firstDate").text();
        endDate = $("#secondDate").text();
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

})