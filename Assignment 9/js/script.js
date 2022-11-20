const state = [0, 0, 0, 0, 0, 0];

let initialTableState = [];
let initialData = [];

$(document).ready(function () {
	$.ajax({
		type: 'GET',
		url: '../characters.json',
		success: function (data) {
			$.each(data, function (index, ch) {
				const el = `
				<tr>
				<td>${ch.firstName}</td>
				<td>${ch.lastName}</td>
				<td>${ch.voicedBy}</td>
				<td>${ch.firstAppearance}</td>
				<td>${ch.characterType}</td>
				<td>${ch.dateOfBirth}</td>
				<tr/>
				`;
				initialData.push($(el));
				initialTableState.push($(el));
				$('tbody').append(el);
			});

			initialData = $(initialData);
			initialTableState = $(initialTableState);

			const atom = data.filter(
				d => d.lastName[0] < 'M' && d.lastName[0] > 'A'
			).length;

			const ntoz = data.filter(
				d => d.lastName[0] < 'Z' && d.lastName[0] > 'N'
			).length;

			const button = $('<button/>', {
				text: `A - M (${atom})`,
				click: function () {
					$('tbody').children().remove();
					$(initialTableState).each(function () {
						$('tbody').append($(this));
					});

					$('tbody tr').filter(function () {
						$(this).toggle(
							'abcdefghijklm'.includes(
								$(this).children().eq(1).text().toLowerCase()[0]
							)
						);
					});

					initialData = $('table')
						.find('tbody > tr')
						.filter(function () {
							if ($(this).css('display') !== 'none')
								return $(this);
						});
				},
			});

			const button1 = $('<button/>', {
				text: `N - Z (${ntoz})`,
				click: function () {
					$('tbody').children().remove();
					$(initialTableState).each(function () {
						$('tbody').append($(this));
					});

					$('tbody tr').filter(function () {
						$(this).toggle(
							'nopqrstuvwxyz'.includes(
								$(this).children().eq(1).text().toLowerCase()[0]
							)
						);
					});

					initialData = $('table')
						.find('tbody > tr')
						.filter(function () {
							if ($(this).css('display') !== 'none')
								return $(this);
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

$('thead > tr > th a').each(function (column, el) {
	let step = state[column];
	$(this).click(function () {
		let records = $('table')
			.find('tbody > tr')
			.filter(function () {
				if ($(this).css('display') !== 'none') return $(this);
			});

		state[column]++;
		const step = state[column];

		if (step === 1) $(el).parent().append('<span>&#x25B2</span>');
		else if (step === 2) {
			$(el).next().remove();
			$(el).parent().append('<span>&#x25BC<span/>');
		} else $(el).next().remove();

		if (step <= 2) {
			records.each(function () {
				$(this).remove();
			});

			records.sort(function (a, b) {
				const value1 = $(a).children('td').eq(column).text();
				const value2 = $(b).children('td').eq(column).text();
				return value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
			});

			if (step === 2)
				$(records.get().reverse()).each(function () {
					$('tbody').append($(this));
				});
			else {
				records.each(function () {
					$('tbody').append($(this));
				});
			}
		} else {
			const el = $('tbody');
			el.children().remove();
			$(initialData).each(function () {
				el.append($(this));
			});
		}

		state[column] %= 3;
	});
});
