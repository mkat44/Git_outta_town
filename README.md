# Git_outta_town
Heroku deployed link: "https://coding-bootcamp-project-1.herokuapp.com/index.html"

## Concept
Our original concept was a website where the user could get information about which locations around the US are the best place
to live, based on certain criteria such as average temperature and crime rate. This idea morphed into our final idea, that of
a travel website where the user could search a city, state, and date range, and it would bring up various pieces of
information aobut the city, as well as a dynamically created table of different types of events going on around that city
during that date range.

## Technologies
We used many different libraries in our website, including...
1. Materialize CSS - The main CSS library used for the front end design of our website.
2. jQuery - Our main JavaScript library we have used until this point, helped with dynamic creation.
3. Moment.js - For our date ranges, we used Moment.js to capture dates and times from the input and use them with our various
APIs.
4. Reset.css - We used the standard reset.css page to reset all browser-specific CSS and make sure our website works with all
browsers.
5. Font Awesome - We used Font Awesome for linkable icons on the page.
6. APIs - The backbone of this site is our APIs, which include...
* Mapquest API - Used for geolocation services.
* EventBrite API - Used for the "Music" and "Food & Drink" events.
* Meetup API - Used for the "Social" events.
* Ticketmaster API - Used for the "Sports" and "Theater" events.

## Front-end Design
We saw that one of the "Nice to haves" on the project was to use the Materialize CSS library to polish the look of the front-
end, and we pursued that with our design. Originally, Eric was having trouble using the Parallax functionality in Materialize,
but he saw that as the basis for our front-end design. We wanted to dynamically create our elements so that they would 
function if the user inputted another city without refreshing the page, so Eric created a <div> with an id of "mainContent" 
which held all of the dynamically created events. To display the events, we used a Materialize Collapsible element so that
the user could view only the events that interested them, and not clutter the page. This turned out very nicely in the final
project, as the content of the collapsibles updates while keeping the table looking nice.
  
## JavaScript Framework
When using all of these different APIs and libraries, we had to make sure that all content being pushed into the master branch
was fully functioning and did not mess with anybody else's functions. For each of the cities, the buttons that show under the
city name are dynamically created, and update their URLs when the "Search" button is pressed. The content within each 
Collapsible header is created when that header is clicked, and is refreshed on the same click once the city is changed. They
do not refresh when the search button is pressed because of some API limits, such as the tickermaster API, which only allows
one call per 3 seconds, and it is used in more than one of the genres. 
