var style = 'mapbox://styles/mapbox/outdoors-v11' //streets-v11, outdoors-v11, light-v10, dark-v10, satellite-v9
	var start = [-0.5704, 51.2362]; //default location Guildford
	var map;
	var distance = '0km';
	var duration = '0min';
	
		if (navigator.geolocation) { //requests permission for GPS tracking
			navigator.geolocation.getCurrentPosition(setStartAsCurrentLocation, permissionDenied);
		} else {			
			console.log("Geolocation is not supported by this browser."); //use defualt settings if location unsupported
			map = loadMap();
		}
		
		function permissionDenied(error) { //use defualt settings if location permission denied
			if (error.code == error.PERMISSION_DENIED) {
				console.log("Location Denied");
				map = loadMap();
			}
		}

		function setStartAsCurrentLocation(position) { 
		  start = [position.coords.longitude, position.coords.latitude]; 
		  map = loadMap();
		}
			
		function loadMap() {
			//create map
		    mapboxgl.accessToken = 'pk.eyJ1IjoiZmwwMDMyNyIsImEiOiJja242ZWw4N2owZGVjMnFwNGgwNGc4N3E1In0.ArXcZDYAJK7pbPK2QVj5iQ';
		    map = new mapboxgl.Map({
		        container: 'map',
		        style: style,
		        center: start,
		        zoom: 13
		    });
			// add directions plugin
		    directions = new MapboxDirections({
		        accessToken: mapboxgl.accessToken,
		        unit: 'metric',
  				profile: 'mapbox/walking'
		    });
		    directions.setOrigin(start);
		    map.addControl(directions, 'top-left');
		    
			//Add geolocate control to the map.
			map.addControl( 
				new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true
					},
					trackUserLocation: true
				})
			);
			
			//Get measurement information
			directions.on('route', function() { //when route updated
				//retrieve measurements from mapbox gl plugin
				var measurements = document.getElementsByClassName('mapbox-directions-component mapbox-directions-route-summary')			
				distance = measurements[0].firstElementChild.textContent; //update distance and duration variables
				duration = measurements[0].lastElementChild.textContent;
			});
			
		    return map;   

    
	    }
	    
	    function reloadMap() {
		    //map.setStyle(style);
		    map.remove();
		   	loadMap();
	   
	    }
	    
	    function setStyle(obj, newStyle) { //change style of map when button clicked
			var x = document.getElementsByClassName('mapbox-directions-component mapbox-directions-route-summary').value;
			console.log(x)
			if (newStyle !== style) {
				elements = document.getElementsByClassName('activeStyle')[0].classList.toggle('activeStyle'); //updates which style button active 
				obj.classList.toggle('activeStyle'); 
				style = newStyle;
				reloadMap();						
			}
		}
		
		function logRoute(){
			alert("Submitted Exercise.\n" + distance + "\n" + duration);
		}