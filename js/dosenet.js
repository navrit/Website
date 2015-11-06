var map; // Google Map Object
var berkeley = [37.872269, -122.258901];
var markers = [];
var markerCluster;
var marks = [];
var infowindow = new google.maps.InfoWindow();
// url for geoJSON file
var url = 'output.geojson?'
	+ Math.random().toString(36).replace(/[^a-z]+/g, ''); // To solve browser caching issue
var json = $($.parseJSON(JSON.stringify($.getJSON(url))));
var parsed_json = '';
var time = '';
var dose = '';
var dosimeter_name = '';
var graph_url = '';
var selected_marker = '';
var selected_val = '';

function https(){
	var secureURL = document.URL.replace("http:","https:");
}

function centerMap(center){
	var mapCenter = new google.maps.LatLng(center[0], center[1]);
	map.setCenter(mapCenter);
}

function updateInfowindowContent(val){
	time = getTimeframe();
	dose = getDoseUnit();
	var plotly_url = "URL_" + dose + "_" + time;
	var iframeIntro = "<iframe width=\"500\" height=\"400\" frameborder=\"0\" \
		seamless=\"seamless\" scrolling=\"no\" src=\"";
	var iframeEnding = ".embed?width=500&height=400\"></iframe>";
	graph_url = val.properties[plotly_url.toString()];
	return iframeIntro + graph_url + iframeEnding;
}

// Time units for a plot, called in updateInfowindowContent
function getTimeframe(){
	infowindow.close();
	var sel_time = document.getElementById('time_dropdown');
	return sel_time.options[sel_time.selectedIndex].value;
}

// Dose units for a plot, called in updateInfowindowContent
function getDoseUnit(){
	var sel = document.getElementById('dose_dropdown');
	return sel.options[sel.selectedIndex].value;
}

function clearMarkers() {
  markerCluster.clearMarkers();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function setMarkerIcon(marker){
    // Sets Marker Icon to [red, green, yellow, purple, green] marker
    marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png');
}

function repopulateMarkers(){
	$.getJSON(url, function(data){
		$.each(data.features, function(key, val){
			var lon = getCoords(val).lon;
			var lat = getCoords(val).lat;
	        var marker = new MarkerWithLabel({
	            map: map,
	            title: name,
	            position: new google.maps.LatLng(lat, lon),
	            labelContent: getLabelContent(val),
	            labelAnchor: new google.maps.Point(20, 0),
	            labelClass: "labels",
	        });
	        markers.push(marker);
	        setMarkerIcon(marker);
			addMarkerEventListeners(val, marker);
      	});
		markerCluster.addMarkers(markers);
	});
}

function changeDoseUnits(){
	infowindow.close();
	infowindow.open(map, selected_marker);
	clearMarkers();
	setHTML_units();
	selected_unit = getDoseUnit();
	repopulateMarkers();
}

function getDosimeterCoords(index){
	var lat = parsed_json.features[index].geometry.coordinates[1];
	var lon = parsed_json.features[index].geometry.coordinates[0];
	var location = new google.maps.LatLng(lat, lon);
	return location
}

function getSelectedDosimeterIndex(){
	var sel = document.getElementById('dosimeter_dropdown');
	var index = sel.selectedIndex;
	dosimeter_name = sel.options[sel.selectedIndex].value;
	return index
}

function goToDosimeter(){
	infowindow.close();
	var index = getSelectedDosimeterIndex();
	var center = getDosimeterCoords(index);
	map.setCenter(center);
}

function initMap(){
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		zoom: 9,
		disableDefaultUI: true
	});
	google.maps.event.addListener(map, 'click', function() {
		infowindow.close();
	});
}

function getCoords(val){
	return {
		lon : val.geometry.coordinates[0],
		lat : val.geometry.coordinates[1]
	}
}

function getLabelContent(val){
	selected_unit = getDoseUnit();
	switch(selected_unit) {
		case 'CPM':
			latest_val = (val.properties["Latest dose (CPM)"]).toFixed(1);
			break;
		case 'REM':
			selected_unit = 'mrem/hr'
			latest_val = (val.properties["Latest dose (mREM/hr)"]).toFixed(4);
			break;
		case 'USV':
			selected_unit = '&microSv/hr'
			latest_val = (val.properties["Latest dose (&microSv/hr)"]).toFixed(3);
			break;
		case 'plane':
			selected_unit = 'plane hrs'
			latest_val = (val.properties["Latest dose (&microSv/hr)"]*0.420168067).toFixed(4);
			break;
		case 'cigarette':
			selected_unit = 'cigarettes/hr'
			latest_val = (val.properties["Latest dose (&microSv/hr)"]*0.00833333335).toFixed(4);
			break;
		case 'medical':
			selected_unit = 'X-Rays/hr'
			latest_val = (val.properties["Latest dose (&microSv/hr)"]*0.2).toFixed(4);
			break;
		default:
			latest_val = (val.properties["Latest dose (CPM)"]).toFixed(1);
			break;
	}
	return ("&nbsp" + latest_val + "&nbsp" + selected_unit + "&nbsp");
}

function addMarkerEventListeners(val, marker){
	// Adds listener to open infowindow with content from updateInfowindowContent()
	// updateInfowindowContent() will allow you to enter the graphs from the geoJSON file
	google.maps.event.addListener(marker, 'click', (function(marker) {
		return function() {
			infowindow.setContent(updateInfowindowContent(val));
			infowindow.open(map, marker);
			selected_val = val;
			selected_marker = marker;
		};
	})(marker));
}

function addTimeDropdownListener(){
	$("#time_dropdown").change(function(){
		//infowindow.close();
		goToDosimeter();
		infowindow.setContent(updateInfowindowContent(selected_val));
		infowindow.open(map, selected_marker);
	});
}

$(document).ready(function(){
	var marker;
	initMap();
	centerMap(berkeley); //Because we're self-centered.

	// Fetch geoJSON file - runs function on complete, 'data' is extracted from JSON
	$.getJSON(url, function(data){
		parsed_json = data;
		// For each item in "features" array inside data runs function
		// key: position of item in the array Features
		// val: value of item
		$.each(data.features, function(key, val){
			$("#dosimeter_dropdown").append($("<option />").text(val.properties["Name"]));
			var lon = getCoords(val).lon;
			var lat = getCoords(val).lat;
	        var marker = new MarkerWithLabel({
	            map: map,
	            title: name,
	            position: new google.maps.LatLng(lat, lon),
	            labelContent: getLabelContent(val),
	            labelAnchor: new google.maps.Point(20, 0),
	            labelClass: "labels",
				animation: google.maps.Animation.DROP
	        });
			markers.push(marker);
	        setMarkerIcon(marker);
			addMarkerEventListeners(val, marker);
      	});
		addTimeDropdownListener();
		var mcOptions = {gridSize: 40, maxZoom: 15};
		markerCluster = new MarkerClusterer(map, markers, mcOptions);
	});
});
