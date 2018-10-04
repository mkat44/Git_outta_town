// Wikipedia link generator
var city = ""
var link = "https://en.wikipedia.org/wiki/"

window.onload = function(){
    $(".btn").click(function(){
        city = $("#cityName").val()
        console.log(city)

        fullLink = link + city

        $('<div>', {
            id: 'wikiLinkHolder'
        }).append( $('<div>', {
            id: 'wikiLink'
        })).append("<a href = '" + fullLink + "'>"+fullLink).appendTo("#mainContent")
    })
}