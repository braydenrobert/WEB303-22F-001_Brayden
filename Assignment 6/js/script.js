(function ($) {
	var allPanels = $('.accordion > p').hide();

	$('.accordion > div > a').click(function () {
		allPanels.slideUp();
		$(this).parent().next().slideDown();
		return false;
	});
})(jQuery);

$(document).ready(function () {
	var previousActiveTabIndex = 0;

	$('.tab-switcher').on('click keypress', function (event) {
		if (
			(event.type === 'keypress' && event.which === 13) ||
			event.type === 'click'
		) {
			var tabClicked = $(this).data('tab-index');

			var tabs = $('.tabs > .tab-switcher');

			tabs.each(function () {
				$(this).removeClass('active');
			});

			console.log(tabs);
			$('#allTabsContainer .tab-container').each(function () {
				if ($(this).data('tab-index') == tabClicked) {
					$(tabs[tabClicked]).addClass('active');
					$('.tab-container').hide();
					$(this).show();
					previousActiveTabIndex = $(this).data('tab-index');
					return;
				}
			});
		}
	});
});
