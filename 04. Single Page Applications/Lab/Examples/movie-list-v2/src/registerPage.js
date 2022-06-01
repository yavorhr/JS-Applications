import { saveToken } from './auth.js';
import moviesPage from './moviesPage.js';
import navigation from './navigation.js';


let registerSection = document.querySelector('.register');
let registerForm = document.querySelector('#register-form');

let baseUrl = 'http://localhost:3030';

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('s');
    let data = new FormData(registerForm);

    fetch(`${baseUrl}/users/register`, {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password')
        })
    })
        .then(response => response.json())
        .then(data => {
            hidePage();
            moviesPage.showPage();
            saveToken(data.accessToken);
            navigation.updateNavigation();
        })
})

function showPage() {
    registerSection.classList.remove('hidden');
}

function hidePage() {
    registerSection.classList.add('hidden');
}

export default {
    showPage,
    hidePage
}