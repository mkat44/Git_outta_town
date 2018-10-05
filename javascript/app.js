// Wikipedia link generator
 
 // First we start by creating the variables that we need.  For this case, we have city, which is the city input
 // by the user, we have link, which is the base link for all wiki articles.
 var city  = ""
 var link  = "https://en.wikipedia.org/wiki/"
 var state = ""
 
// Here we get the values of the input forms and assign them to the city and state variables to be displayed.
 window.onload = function(){
     $("#searchButton").click(function(){
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
     })
 }
