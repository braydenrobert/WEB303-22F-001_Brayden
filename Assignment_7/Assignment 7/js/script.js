$(function () {
	$('#photo-viewer')
		.customPhotoViewer()
		.show()
		.on('click', '.photo-box', function (e) {
			console.log('here');
			$(this).clone().find('img').css({
				marginLeft: 0,
				marginTop: 0,
				width: '100%',
				height: 'auto',
			});
			var modal = (function () {
				//Declare modal object
				var $window = $(window);
				var $modal = $('<div class="modal"></div>'); //create markup for modal
				var $content = $('<div class="modal-content"></div>');
				var $close = $(
					'<button role="button" class="modal-close">close</button>'
				); //Create close butoon in modal

				$modal.append($content, $close);

				$close.on('click', function (e) {
					//If user clicks on close
					e.preventDefault(); //Prevent link behavior
					modal.close(); //Close the modal
				});

				return {
					//Add code to modal
					center: function () {
						//Define center() method
						//Calculate distance from top and left of window to center the modal
						var top =
							Math.max(
								$window.height() - $modal.outerHeight(),
								0
							) / 2;
						var left =
							Math.max($window.width() - $modal.outerWidth(), 0) /
							2;

						$modal.css({
							//Set CSS for the modal
							top: top + $window.scrollTop(), //Center vertical ly
							left: left + $window.scrollLeft(), //Center horizontally
						});
					},
					open: function (settings) {
						//Define open() method
						$content.empty().append(settings.content); //Set new content of modal

						$modal
							.css({
								//Set modal dimensions
								width: settings.width || 'auto',
								height: settings.height || 'auto',
								color: 'blue',
								background: 'red',
							})
							.appendTo('body'); //Add it to the page

						modal.center(); //Call center() method
						$(window).on('resize scroll', modal.center); //Call it if window resized
					},
					close: function () {
						//Define close() method
						$content.empty(); //Remove content from modal
						$modal.detach(); //Remove modal from page
						$window.off('resize', modal.center); //Remove event handler
					},
				};
			})();
			(function () {
				var $content = $('#share-options').detach(); //Remove modal from page

				$('#share').on('click', function () {
					//Click handler to open modal

					modal.open({ content: $content, width: 300, height: 300 }); //informatin passed in JSON format
				});
			})();
			
			//Inserted Code-
			
		$('a.thumbnail').on('click', function() {
		var href = $(this).attr('href');
		$('a.photo-box').attr('href', href);
		});
			
			
		$('a.photo-box').click(function(){
			let modal = $('#modal');
			let clone = $(this).find('img').clone();
			modal.append(clone);
			modal.addClass('is-open');
		});
		
		});
});
