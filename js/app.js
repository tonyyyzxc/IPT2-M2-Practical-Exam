document.addEventListener('DOMContentLoaded', function () {
	const addStudentButton = document.getElementById('addStudentButton');
	const tableContent = document.getElementById('table-content');

	if (!addStudentButton || !tableContent) {
		return;
	}

	addStudentButton.addEventListener('click', function () {
		const inputIds = ['idNumber', 'firstName', 'middleName', 'lastName'];
		const values = inputIds.map(function (inputId) {
			return document.getElementById(inputId).value.trim();
		});
		const row = document.createElement('tr');

		values.forEach(function (value) {
			const cell = document.createElement('td');
			cell.textContent = value;
			row.appendChild(cell);
		});

		tableContent.appendChild(row);

		inputIds.forEach(function (inputId) {
			document.getElementById(inputId).value = '';
		});
	});
});
