
function solve() {
    getAllStudents();
    document.getElementById('submit').addEventListener('click', addStudent);
}
solve();

async function addStudent(event) {
    event.preventDefault();
    const form = document.getElementById('form');
    const formData = new FormData(form);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (!(firstName && lastName && facNumber && grade)) {
        return alert('All fields are required!');
    }

    if (isNaN(facNumber) || isNaN(grade)) {
        return alert('Grade and Faculty number must be a number value');
    }

    const student = {
        firstName: firstName, lastName: lastName,
        facultyNumber: facNumber, grade: grade
    };

    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(student)
    });

    if (!response) {
        return;
    }
    createStudent(firstName, lastName, facNumber, grade);
}

async function getAllStudents() {
    document.querySelector('tbody').innerHTML = '';
    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await response.json();

    if (!response) {
        return;
    }

    Object.values(data).forEach(obj => {
        console.log(obj.facultyNumber);
        const firstName = obj.firstName;
        const lastName = obj.lastName;
        const facNumber = obj.facultyNumber;
        const grade = obj.grade;
        createStudent(firstName, lastName, facNumber, grade);
    });

}

function createStudent(firstName, lastName, facNumber, grade) {
    const tr = document.createElement('tr')

    const tdFirstName = document.createElement('th');
    tdFirstName.textContent = firstName;

    const tdLastName = document.createElement('th');
    tdLastName.textContent = lastName;

    const tdfacultyNumber = document.createElement('th');
    tdfacultyNumber.textContent = facNumber;

    const tdgrade = document.createElement('th');
    tdgrade.textContent = grade;

    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdfacultyNumber);
    tr.appendChild(tdgrade);

    document.querySelector('tbody').appendChild(tr);
}
