/*try {
    var infowindow = new google.maps.InfoWindow();
} catch(err) {
    console.log("Couldn't make a Google Map. Error is " + err);
}*/

var map; // Google Map Object
var berkeley = [37.872269, -122.258901];
var markers = [];
var markerCluster;
var marks = [];
// url for geoJSON file
var url = '/output.geojson?'
	+ Math.random().toString(36).replace(/[^a-z]+/g, ''); // To solve browser caching issue
var json = $($.parseJSON(JSON.stringify($.getJSON(url))));
var parsed_json = '';
var time = '';
var dose = '';
var dosimeter_name = '';
var graph_url = '';
var selected_marker = '';
var selected_val = '';

function centerMap(center){
	var mapCenter = new google.maps.LatLng(center[0], center[1]);
	map.setCenter(mapCenter);
}

// These two functions should be temporary until this can be done in makeGeoJSON as we phase out plot.ly
function getURL(val){
    var name = val.properties["Name"];
    var url = '//radwatch.berkeley.edu/sites/default/files/dosenet/';
    var random_string = Math.random().toString(36).replace(/[^a-z]+/g, '');
    switch(name) {
        case 'LBL':
            url += 'lbl.csv?' + random_string;
        break;
        case 'Campolindo High School':
            url += 'campolindo.csv?' + random_string;
        break;
        case 'Pinewood High School':
            url += 'pinewood.csv?' + random_string;
        break;
        case 'Etcheverry Hall':
            url += 'etch.csv?' + random_string;
        break;
        case 'Etcheverry Hall Roof':
            url += 'etch_roof.csv?' + random_string;
        break;
    }
    return url;
}
function getName(val){
    var name = val.properties["Name"];
    var short_name = 'NONAME';
    switch(name) {
        case 'LBL':
            short_name = 'LBL';
        break;
        case 'Campolindo High School':
            short_name = 'Campolindo';
        break;
        case 'Pinewood High School':
            short_name = 'Pinewood';
        break;
        case 'Etcheverry Hall':
            short_name = 'Etcheverry Hall';
        break;
        case 'Etcheverry Hall Roof':
            short_name = 'Etcheverry Roof';
        break;
    }
    return short_name;
}

/*function updateInfowindowContent(val){
	time = getTimeframe();
	dose = getDoseUnit();
    url = getURL(val);
    name = getName(val);

	if( dose=='plane'||dose=='cigarette'||dose=='medical') {
		dose = 'USV';
	}
	var plotly_url = "URL_" + dose + "_" + time;

    var node_name = dose + '_' + time + '_' + name;
    var content_string = '<div id="' + node_name + '"" style="width:500px; height=400px"></div>';
    get_data(url.toString(),name.toString(),dose,time,node_name);
    return content_string;
}*/

// Time units for a plot, called in updateInfowindowContent
function getTimeframe(){
	//infowindow.close();
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
			//addMarkerEventListeners(val, marker);
      	});
		markerCluster.addMarkers(markers);
	});
}

function changeDoseUnits(){
	//infowindow.close();
	//infowindow.open(map, selected_marker);
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
	//infowindow.close();
	var index = getSelectedDosimeterIndex();
	var center = getDosimeterCoords(index);
	map.setCenter(center);
}

function initMap(){
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		zoom: 9,
		disableDefaultUI: true
	});
	/*google.maps.event.addListener(map, 'click', function() {
		infowindow.close();
	});*/
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
			latest_val = (val.properties["CPM"]).toFixed(1);
			break;
		case 'REM':
			selected_unit = 'mrem/hr'
			latest_val = (val.properties["mREM/hr"]).toFixed(4);
			break;
		case 'USV':
			selected_unit = '&microSv/hr'
			latest_val = (val.properties["&microSv/hr"]).toFixed(3);
			break;
		case 'plane':
			selected_unit = 'plane hrs'
			latest_val = (val.properties["&microSv/hr"]*0.420168067).toFixed(4);
			break;
		case 'cigarette':
			selected_unit = 'cigarettes/hr'
			latest_val = (val.properties["&microSv/hr"]*0.00833333335).toFixed(4);
			break;
		case 'medical':
			selected_unit = 'X-Rays/hr'
			latest_val = (val.properties["&microSv/hr"]*0.2).toFixed(4);
			break;
		default:
			latest_val = (val.properties["&microSv/hr"]).toFixed(3);
			break;
	}
	return ("&nbsp" + latest_val + "&nbsp" + selected_unit + "&nbsp");
}

/*function addMarkerEventListeners(val, marker){
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
}*/

function addTimeDropdownListener(){
	$("#time_dropdown").change(function(){
		//infowindow.close();
		goToDosimeter();
		//infowindow.setContent(updateInfowindowContent(selected_val));
		//infowindow.open(map, selected_marker);
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
			//addMarkerEventListeners(val, marker);
      	});
		addTimeDropdownListener();
		var mcOptions = {gridSize: 40, maxZoom: 15};
		markerCluster = new MarkerClusterer(map, markers, mcOptions);
	});
});
