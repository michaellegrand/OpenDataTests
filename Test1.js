
var _map;
var _geocoder;
var _isCentered;

$(window).load(function() {
    // Construct the catalog query string
    url = 'http://data.ct.gov/resource/9k2y-kqxn.json?organization_type=Public%20School%20Districts&$$app_token=CGxaHQoQlgQSev4zyUh5aR5J3';
    
    // Intialize our map
    var center = new google.maps.LatLng(41.7656874,-72.680087);
    var mapOptions = {
      zoom: 15,
      center: center
    }
    _map = new google.maps.Map(document.getElementById("map"), mapOptions);
    _geocoder = new google.maps.Geocoder();
    
    // Retrieve our data and plot it
    $.ajax({
	    url: "https://data.baltimorecity.gov/resource/93w7-t2ys.json",
	    type: "GET",
	    data: {
	      "$limit" : 5000,
	      "$$app_token" : "xCe6b3J1AHS5QkokrLKiF5uQC"
	    }
	}).done(function(data) {
	  console.log("Retrieved " + data.length + " records from the dataset!");
	  $.each(data, function(i, entry) {
	  	setTimeout(function() {geocodeAddress(entry)}, i*700);
	  });
	});

});

function geocodeAddress(data) {
	if (data.description == 'LARCENY FROM AUTO') {
		console.log('breaking into car');
		return;
	}
	var image = 'http://media.tumblr.com/faa0c5c2b7ca1af77a36341a139db743/tumblr_inline_mjs0u18neE1qdlkyg.gif';
	var address = data.location + ' ' + 'Baltimore' + ' ' + '21217';
	_geocoder.geocode({'address': address}, function(results, status) {
	  if (status === 'OK') {
	  	if (!_isCentered) {
	    	_map.setCenter(results[0].geometry.location);
	    	_isCentered = true;
	    }
	    var marker = new google.maps.Marker({
	      map: _map,
	      position: results[0].geometry.location,
	      icon:image
	    });
	  } else {
	  	console.log('Geocode was not successful for the following reason: ' + status);
	  }
	});
};


