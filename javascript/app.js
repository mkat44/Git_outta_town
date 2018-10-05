$(document).ready(function() {
// seatgeek client id ODcxNzI3MXwxNTM4Njc2MTg3Ljc0
// ticketmaster consumer key FJe0EUZsiu36JGLaKJ0OTRG6MUalTIbh

    $(document).on("click", "#new-city", displayEventBox);

    $(document).on("click", "#sportsH", displayEvents);
    $(document).on("click", "#musicH", displayEvents);
    $(document).on("click", "#theatreH", displayEvents);

    function displayEventBox(){

        // <input id="sportsH" class="eventH" type="submit" value="Sports">
        // <input id="musicH" class="eventH" type="submit" value="Music">
        // <input id="theatreH" class="eventH" type="submit" value="Theatre">

        var eventBox = $("<div>");
        eventBox.addClass("eventBoxH");

        var sportsButton = $("<input id=sportsH class=eventH type=submit value=Sports>");
        var musicButton = $("<input id=musicH class=eventH type=submit value=Music>");
        var theatreButton = $("<input id=theatreH class=eventH type=submit value=Theatre>");

        eventBox.append(sportsButton);
        eventBox.append(musicButton);
        eventBox.append(theatreButton);

        $("#mainContent").append(eventBox);

    }

    function displayEvents(){

        var event = $(this).attr("value");
        console.log("event = " + event);

        cityName = $("#city-name").text();
        stateName = $("#state-name").text();
        startDate = $("#start-date").text();
        endDate = $("#end-date").text();
        console.log("cityName = " + cityName);

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityName + "&stateCode=" + stateName + "&startDateTime=" + startDate +"T00%3A00%3A00Z&endDateTime=" + endDate + "T23%3A59%3A00Z&keyword=" + event + "&apikey=FJe0EUZsiu36JGLaKJ0OTRG6MUalTIbh";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {

            var Results = response._embedded;

            console.log(Results);
            
        });
    }
})