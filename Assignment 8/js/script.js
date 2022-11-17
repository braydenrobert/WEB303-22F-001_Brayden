let tableState = null;

$(document).ready(function () {
	$.ajax({
		type: 'GET',
		url: '../characters.json',
		success: function (data) {
			tableState = data;
			data.forEach(ch =>
				$('tbody').append(`
            <tr>
            <td>${ch.firstName}</td>
            <td>${ch.lastName}</td>
            <td>${ch.voicedBy}</td>
            <td>${ch.firstAppearance}</td>
            <td>${ch.characterType}</td>
            <tr/>
            `)
			);

			const atom = data.filter(
				d => d.lastName[0] < 'M' && d.lastName[0] > 'A'
			).length;

			const ntoz = data.filter(
				d => d.lastName[0] < 'Z' && d.lastName[0] > 'N'
			).length;

			const button = $('<button/>', {
				text: `A - M (${atom})`,
				click: function () {
					$('tbody tr').filter(function () {
						$(this).toggle(
							'abcdefghijklm'.includes(
								$(this).children().eq(1).text().toLowerCase()[0]
							)
						);
					});
				},
			});

			const button1 = $('<button/>', {
				text: `N - Z (${ntoz})`,
				click: function () {
					$('tbody tr').filter(function () {
						$(this).toggle(
							'nopqrstuvwxyz'.includes(
								$(this).children().eq(1).text().toLowerCase()[0]
							)
						);
					});
				},
			});

			$('table').after(button1);
			$('table').after(button);
		},
	});
});

$('input').on('input', function () {
	const text = $(this).val();
	$('tbody')
		.find('tr')
		.each(function (i) {
			$(this).css({ background: '#fff', color: '#000' }); //  <= this line
			if (
				$(this)
					.find('td:first-child')
					.text()
					.toUpperCase()
					.match(text.toUpperCase()) &&
				text.length > 0
			)
				$(this).css({ background: '#006400', color: '#fff' });
		});
});
