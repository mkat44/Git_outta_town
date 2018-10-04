// Wikipedia link generator

// First we start by creating the variables that we need.  For this case, we have city, which is the city input
// by the user, we have link, which is the base link for all wiki articles.
var city  = ""
var link  = "https://en.wikipedia.org/wiki/"
var state = ""

// Here we are creating our wiki link on our page.  Upon clicking the #searchButton button, we first set the city
// variable to equal the value of text inside of the #searchBar input, then set the state variable to equal the 
// value of text inside of the #searchState input.  After this, we set the first letter of city to be uppercase
// and all letters of state to be uppercase.  This resolves any issues with wikipedia not recognizing, for example
// https://en.wikipedia.org/wiki/Monticello, mn.  After that, we create a new variable called fullLink that 
// takes the wikipedia base link, adds the city name, and then adds a comma and a space.  This comma and space is
// what seperates the city and state in the wiki link.  Then it adds the state variable.
window.onload = function(){
    $("#searchButton").click(function(){
        // Setting the city and state variables
        city  = $("#searchBar").val()
        state = $("#searchState").val()
        // Making the cities first character uppercase and making state all uppercase.
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
=======

// Here we are doing everything to generate the link.  Upon clicking any button, it runs a function that sets our
// city varible to be the vavlue of a #cityName text input box. Then, we set a new variable called fullLink to equal
// the base wiki link plus the city name, this creating a link similar to this: https://en.wikipedia.org/wiki/Detroit
// After this, we create a new dive that holds the wikiLink div, and in the wikiLink div, we hold the link to the
// wikipedia page.  Then we simply append it to the main content div. 
window.onload = function(){
    $(".btn").click(function(){
        city = $("#cityName").val()

        var fullLink = link + city

        $('<div>', {
            id: 'wikiLinkHolder'
        }).append( $('<div>', {
            id: 'wikiLink'
        })).append("<a href = '" + fullLink + "'>"+fullLink).appendTo("#mainContent")
    })
}
