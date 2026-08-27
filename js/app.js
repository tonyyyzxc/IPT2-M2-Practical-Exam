// app.js

// 1. Data Store (loads existing data from localStorage if available)
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let students = JSON.parse(localStorage.getItem("students")) || [];

// 2. DOM Elements (ensure these match your HTML IDs)
const subjectForm = document.getElementById("subjectForm");
const subjectCodeInput = document.getElementById("subjectCode");
const subjectNameInput = document.getElementById("subjectName");
const unitsInput = document.getElementById("units");
const instructorInput = document.getElementById("instructor");
const studentTableBody = document.getElementById("studentTableBody");
const studentForm = document.getElementById("studentForm");
const addStudentButton = document.getElementById("addStudentButton");
const studentListBody = document.getElementById("table-content");
const idNumberInput = document.getElementById("idNumber");
const firstNameInput = document.getElementById("firstName");
const middleNameInput = document.getElementById("middleName");
const lastNameInput = document.getElementById("lastName");

// 3. Add Subject Function
function addSubject(event) {
  if (event) event.preventDefault();

  // Retrieve input values
  const code = subjectCodeInput ? subjectCodeInput.value.trim() : "";
  const name = subjectNameInput ? subjectNameInput.value.trim() : "";
  const units = unitsInput ? unitsInput.value.trim() : "";
  const instructor = instructorInput ? instructorInput.value.trim() : "N/A";

  // Validation
  if (!code || !name || !units) {
    alert("Please fill out all required fields.");
    return;
  }

  // Create new subject object
  const newSubject = {
    id: Date.now(),
    code: code,
    name: name,
    units: units,
    instructor: instructor,
  };

  // Store in array and update table
  subjects.push(newSubject);
  saveAndRender();

  // Reset input fields
  if (subjectForm) {
    subjectForm.reset();
  } else {
    if (subjectCodeInput) subjectCodeInput.value = "";
    if (subjectNameInput) subjectNameInput.value = "";
    if (unitsInput) unitsInput.value = "";
    if (instructorInput) instructorInput.value = "";
  }
}

// 4. Render Function (Populates the Table)
function renderTable() {
  if (!studentTableBody) return;

  // Clear existing rows
  studentTableBody.innerHTML = "";

  // If empty, show a fallback row
  if (subjects.length === 0) {
    studentTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No subjects added yet.</td>
            </tr>
        `;
    return;
  }

  // Populate rows
  subjects.forEach((subj, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${subj.code}</td>
            <td>${subj.name}</td>
            <td>${subj.units}</td>
            <td>${subj.instructor}</td>
            <td class="text-center">
                <button class="btn btn-danger btn-sm" onclick="deleteSubject(${subj.id})">Delete</button>
            </td>
        `;
    studentTableBody.appendChild(row);
  });
}

// 5. Delete Function
function deleteSubject(id) {
  subjects = subjects.filter((subject) => subject.id !== id);
  saveAndRender();
}

// 6. Persistence Helper
function saveAndRender() {
  localStorage.setItem("subjects", JSON.stringify(subjects));
  renderTable();
}

// 7. Add Student Function
function addStudent() {
  const idNumber = idNumberInput ? idNumberInput.value.trim() : "";
  const firstName = firstNameInput ? firstNameInput.value.trim() : "";
  const middleName = middleNameInput ? middleNameInput.value.trim() : "";
  const lastName = lastNameInput ? lastNameInput.value.trim() : "";

  if (!idNumber || !firstName || !middleName || !lastName) {
    alert("Please fill out all student fields.");
    return;
  }

  students.push({ idNumber, firstName, middleName, lastName });
  localStorage.setItem("students", JSON.stringify(students));
  renderStudentTable();

  if (studentForm) {
    studentForm.reset();
  }
}

// 8. Render Student Function
function renderStudentTable() {
  if (!studentListBody) return;

  studentListBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");
    [
      student.idNumber,
      student.firstName,
      student.middleName,
      student.lastName,
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    studentListBody.appendChild(row);
  });
}

// 9. Event Listeners
if (subjectForm) {
  subjectForm.addEventListener("submit", addSubject);
}
if (addStudentButton) {
  addStudentButton.addEventListener("click", addStudent);
}

// Initial render when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  renderStudentTable();
});
