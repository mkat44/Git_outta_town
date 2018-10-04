// Wikipedia link generator

// First we start by creating the variables that we need.  For this case, we have city, which is the city input
// by the user, we have link, which is the base link for all wiki articles.
var city  = ""
var link  = "https://en.wikipedia.org/wiki/"

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