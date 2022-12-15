//All objects in cache object are sets of key/value pairs

var request; //Latest image to be requested
var $current; //Image currently being shown
var $frame = $('.photo-box'); //Container for image
var $thumbs = $('.thumb'); //Container for thumbnail
var cache = {};

function crossfade($img) {
	//Function to fade between images, pass new image as param
	if ($current) {
		//If there is currently an image showing

		$current.stop().fadeOut('slow'); //Stop animation and fade it out
	}

	$img.css({
		//Set the CSS margins for the image
		marginLeft: -$img.width() / 2,
		marginTop: -$img.height() / 2,
	});
	$img.stop().fadeTo('slow', 1); //Stop animation on new i mage & fade in
	$current = $img; //New image becomes current image
}

$.fn.customPhotoViewer = function () {
	$(document).on('click', '.thumb', function (e) {
		console.log('asd');
		e.preventDefault(); //Stop default link behavior
		//When a thumb is clicked on

		var $img; //Create local variable called $img
		var src = this.href; //Store path to image

		request = src; //Store path again in request

		$thumbs.removeClass('active'); //Remove active from al l thumbs
		$(this).addClass('active'); //Add active to clicked thumb

		if (cache.hasOwnProperty(src)) {
			//If cache contains this image

			if (cache[src].isLoading === false) {
				//And if isloading is false
				crossfade(cache[src].$img); //Call crossfade() function
			}
		} else {
			//Otherwise it is not in cache
			$img = $('<img/>'); //Store empty <imgl> element in $img

			cache[src] = {
				//Store this image in cache
				$img: $img, //Add the path to the image
				isLoading: true, //Set isloading property to true
			};
			//Next few lines will run when image has loaded but are prepared first
			$img.on('load', function () {
				//When image has loaded
				$img.hide(); //Hide it
				//Remove is-loading class from frame & append new image to it
				$frame.removeClass('is-loading').append($img); //
				cache[src].isLoading = false; //Update isloading in cache
				//If still most recently requested image then
				if (request === src) {
					crossfade($(this)); //Call crossfade(} function
				} //Solves asynchronous loading issue
			});
			$frame.addClass('is-loading'); //Add is-loading class to frame
			$img.attr({
				//Set attributes on <img> element
				src: src, //Add src attribute to load image
				alt: this.title || '', //Add title if one was given in link
			});
		}
	});
	return this;
};
