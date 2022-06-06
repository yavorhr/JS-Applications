import { render } from '../node_modules/lit-html/lit-html.js';
import { allBooksTemplate, allFormsTemplate, bookLibraryTemplate, formTemplate } from './bookTemplates/bookTemplate.js';
import booksService from './services/booksService.js';

let body = document.querySelector('body');

let addForm = {
    id: 'add-form',
    type: 'add',
    title: 'Add Book',
    submitText: 'Submit',
    submitHandler: createBook
}

let editForm = {
    id: 'edit-form',
    type: 'edit',
    title: 'Edit Book',
    submitText: 'Save',
    class: 'hidden',
    submitHandler: editBook,
    idValue: '',
    authorValue: '',
    titleValue: ''
}

let forms = [addForm, editForm];
let books = [];

render(bookLibraryTemplate([], forms, loadBooks, prepareEdit), body)

async function loadBooks() {
    let booksContainer = document.getElementById('books-container')
    let booksObj = await booksService.getAllBooks();
    books = Object.entries(booksObj).map(([key, val]) => {
        val.id = key;
        return val;
    });

    render(allBooksTemplate(books, prepareEdit), booksContainer)
}

async function createBook(e) {
    e.preventDefault();

    let booksContainer = document.getElementById('books-container')
    let form = e.target;
    let formData = new FormData(form);

    let newBook = {
        author: formData.get('author'),
        title: formData.get('title'),
    }

    let createResult = await booksService.createBook(newBook);
    books.push(createResult);
    console.log(books);

    render(allBooksTemplate(books, prepareEdit), booksContainer);
}

async function prepareEdit(e) {
    let bookElement = e.target.closest('.book');
    let id = bookElement.dataset.id;

    let book = await booksService.getBookById(id);

    editForm.class = undefined;
    editForm.idValue = id;
    editForm.authorValue = book.author;
    editForm.titleValue = book.title;

    render(allBooksTemplate(books, forms, loadBooks, prepareEdit), body);
}


async function editBook(e) {
    e.preventDefault();

    let booksContainer = document.getElementById('books-container')
    let form = e.target;
    let formData = new FormData(form);

    let id = formData.get('id');

    let newBook = {
        author: formData.get('author'),
        title: formData.get('title'),

    }

    let createResult = await booksService.editBook(id, newBook);
    books = books.filter(x => x._id !== id)
    books.push(createResult);


    render(allBooksTemplate(books, prepareEdit), booksContainer);
}