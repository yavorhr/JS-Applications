import { render } from '../node_modules/lit-html/lit-html.js';
import { allStudentsTemplate } from './templates/studentTemplate.js';

let tableTbody = document.querySelector('.container tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

let students = [];

loadStudents();

async function loadStudents() {
   let studentResponse = await fetch('http://localhost:3030/jsonstore/advanced/table')
   let studentsObject = await studentResponse.json();

   students = Object.values(studentsObject).map(s => ({
      name: `${s.firstName} ${s.lastName}`,
      course: s.course,
      email: s.email
   }));

   render(allStudentsTemplate(students), tableTbody);
}

function onClick() {
   let searchInput = document.getElementById('searchField');
   let searchText = searchInput.value.toLowerCase();

   //create copy of students array. We work with the objects from the array, not the initial students.
   let allStudents = students.map(s => Object.assign({}, s));

   let matchedStudents = allStudents.filter(s =>
      Object
         .values(s)
         .some(val => val.toLowerCase().includes(searchText)));

   matchedStudents.forEach(s => s.class = 'select');

   searchInput.value = '';

   render(allStudentsTemplate(allStudents), tableTbody);
}


