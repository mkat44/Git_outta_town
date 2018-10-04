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
        city = city.toLowerCase()
        city = city.charAt(0).toUpperCase() + city.slice(1)
        state = state.toUpperCase()
        

        var fullLink = link + city + ", " + state
        console.log(fullLink)

        $('<div>', {
            id: 'wikiLinkHolder'
        }).append( $('<div>', {
            id: 'wikiLink'
        })).append("<a href = '" + fullLink + "'>"+fullLink).appendTo("#mainContent")
    })
}
