
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    $.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=source:("The New York Times") AND glocations:("' + cityStr + '")&api-key=7db3c88d301c6ff807d89c668c8d8757:15:71296967',function(data) {
    	//console.log("data from NYT:\n" + JSON.stringify(data));
    	 var items = [];
    	 $.each( data.response.docs, function( key, val ) {
    	 //items.push( "<li id='" + key + "'>" + val + "</li>" );
    		 $nytElem.append('<li id="' + key + '"><a href="' + val.web_url + '">' + val.headline.main + '</a></li>');
    		 console.log("URL: " + val.web_url + " - Headline: " + val.headline.main + "\n\n");
    	 });
    }); 
    // load nytimes
    
    // YOUR CODE GOES HERE!
    	
    return false;
};

$('#form-container').submit(loadData);

// loadData();
