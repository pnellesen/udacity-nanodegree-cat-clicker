
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
    var svWidth = window.innerWidth;
    var svHeight = window.innerHeight;
    if (svWidth > 640) svWidth = 640;
    if (svHeight > 640) svHeight = 640;
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=' + svWidth + 'x' + svHeight + '&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load nytimes

    $.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=source:("The New York Times") AND glocations:("' + cityStr + '")&api-key=7db3c88d301c6ff807d89c668c8d8757:15:71296967',function(data) {
    	//console.log("data from NYT:\n" + JSON.stringify(data));
    	 var items = [];
    	 $.each( data.response.docs, function( key, val ) {
    	 //items.push( "<li id='" + key + "'>" + val + "</li>" );
    		 $nytElem.append('<li id="' + key + '"><a href="' + val.web_url + '">' + val.headline.main + '</a></li>');
    		 //console.log("URL: " + val.web_url + " - Headline: " + val.headline.main + "\n\n");
    	 });
    }).error(function() {
    	console.log('Error getting NYT articles');
    	$('.nytimes-container').append('<p>There was a problem retrieving NYT articles</p>');
    	//$nytElem.append('<li>There was a problem retrieving NYT articles</li>');
    
    }); 
    // load wikipedia
    $.ajax({
    	//en.wikipedia.org/w/api.php?action=opensearch&search=St. Louis&limit=10&namespace=0&format=json
    	url:'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&limit=10&namespace=0&format=json',
    	dataType:'jsonp',
    	success:function(data) {
    		console.log('Success! Got Data from ' + this.url + ':' + JSON.stringify(data));
    		var i = 0;
    		$.each(data["1"], function(key,val) {
    			$wikiElem.append('<li id="' + i + '"><a href="' + data["3"][i] + '">' + this + '</a></li>');
    			i++;
    		});
    		console.log('LInk section: ' + data["3"]);
    	},
    	error:function(xhr,status,error) {
    		console.log('Could not get data from Wiki at ' + url + ': ' + xhr);
    	}
    });
    
    // YOUR CODE GOES HERE!
    	
    return false;
};

$('#form-container').submit(loadData);

// loadData();
