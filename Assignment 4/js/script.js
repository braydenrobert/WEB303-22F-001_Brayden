/*
    Assignment #4
    {Brayden Robert}
*/

$(document).ready(function () {
	const error = $('#error');
	const location = $('#locationhere');
	const content = $('#content');

	if (Modernizr.geolocation) {
		getLocation();
		console.log('It is supported');
	} else {
		error.text('Sorry, this feature is not supported!');
		console.log('Sorry the feature not supported');
		return;
	}

	function getLocation() {
		navigator.geolocation.getCurrentPosition(success, fail);
	}

	function success(position) {
		const { latitude, longitude } = position.coords;

		const savedLocation = JSON.parse(localStorage.getItem('location'));

		if (savedLocation) {
			content.append(
				`<p>Previous location: (${latitude}, ${longitude})</p>`
			);
			location.text(`Your location: (${latitude},${longitude})`);
			content.append('<h3>Welcome back</h3>');

			const distance = calcDistanceBetweenPoints(
				savedLocation.latitude,
				savedLocation.longitude,
				latitude,
				longitude
			);

			content.append(
				`<h4>You've traveled ${distance.toFixed(
					0
				)} meters since your last visit</h4>`
			);
		} else {
			location.text(`Your location: (${latitude},${longitude})`);

			content.append(
				"<h3>Welcome! It's your first time using this page.</h3>"
			);
		}

		localStorage.setItem(
			'location',
			JSON.stringify({
				latitude,
				longitude,
			})
		);
	}

	function fail(err) {
		error.text(
			`You must allow geolocation in order to use the application! Error code ${err.code} (${err.message})`
		);
	}
});

// DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
// function to calculate the distance in metres between two lat/long pairs on Earth
// Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
// Aren't those cool variable names? Yah gotta love JavaScript
function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
	var toRadians = function (num) {
		return (num * Math.PI) / 180;
	};
	var R = 6371000; // radius of Earth in metres
	var φ1 = toRadians(lat1);
	var φ2 = toRadians(lat2);
	var Δφ = toRadians(lat2 - lat1);
	var Δλ = toRadians(lon2 - lon1);

	var a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c;
}
