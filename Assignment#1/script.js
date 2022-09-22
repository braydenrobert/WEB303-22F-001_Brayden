/*
	WEB 303 Assignment 1 - jQuery
	{Your Name Here}
*/

$(document).ready(function () {
  const salaryElem = $('#yearly-salary')
  const percentElem = $('#percent')
  const amountElem = $('span#amount')

  // Keyup event listener for salaryElem and percentElem
  salaryElem.on('keyup', calculate)
  percentElem.on('keyup', calculate)

  function calculate() {
    const salary = salaryElem.val()
    const percent = percentElem.val()

    // Calculating result and showing it
    const result = '$' + ((salary * percent) / 100).toFixed(2)
    amountElem.text(result)
  }
})
