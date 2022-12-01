const select = $('#countries');
const username = $('#username');
const password = $('#password');
const confirmPassword = $('#confirmPassword');
const tos = $('#tos');
const submit = $('#submit');

submit.prop('disabled', true);

const conditions = {
	username: false,
	password: false,
	confirmPassword: false,
	checked: false,
	country: false,
};

username.keyup(function () {
	setValid($(this).val() !== '', username);
});

password.keyup(function () {
	setValid($(this).val() === confirmPassword.val(), 'confirmPassword');
	setValid($(this).val().length >= 12, 'password');
});

confirmPassword.keyup(function () {
	setValid($(this).val() === password.val(), 'confirmPassword');
});

tos.change(function () {
	setValid($(this).is(':checked'), 'checked');
});

select.change(function () {
	setValid($(this).val() !== '', 'country');
});

function setValid(condition, name) {
	conditions[name] = condition;
	enableSubmitIfAllValid();
}

function enableSubmitIfAllValid() {
	Object.entries(conditions)
		.map(entry => entry[1])
		.reduce((acc, curr) => acc + curr, 0) === 5
		? submit.prop('disabled', false)
		: submit.prop('disabled', true);
}

$(document).ready(function () {
	$.each(countries, function (_, country) {
		$(select).append(
			`<option value="${country.code}">${country.name}</option>`
		);
	});
});

$('form').submit(function (event) {
	event.preventDefault();
	$(document.body).append(
		`<h1>Welcome ${username.val()}! The country code you selected is ${select.val()}</h1>`
	);
});
