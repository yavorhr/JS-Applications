const title = document.querySelector('#title');
const content = document.querySelector('#content');

document.querySelector('nav').addEventListener('click', (event) => {
    switch (event.target.id) {
        case "Home":
            title.textContent = "Home page";
            content.textContent = "Home page main content";
            break;
        case "About":
            title.textContent = "About us page";
            content.textContent = "Contact information";
            break;
            break;
        case "Contacts":
            title.textContent = "Contacts page";
            content.textContent = "Contacts information";
            break;
    }
})

