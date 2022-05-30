async function solution() {
    const data = await getTitle();
    const titles = Object.values(data);

    const main = document.getElementById('main');
    for (const currentTitle of titles) {
        /*
        0: {…}
        _id: "ee9823ab-c3e8-4a14-b998-8c22ec246bd3"
        title: "Scalable Vector Graphics"
        */

        const divAccordion = createElement('div', 'accordion');
        const divHead = createElement('div', 'head');
        const spanTitle = createElement('span', "");
        spanTitle.textContent = currentTitle.title;
        const button = createElement('button', 'button');
        button.id = currentTitle._id;
        button.textContent = "More";

        divHead.appendChild(spanTitle);
        divHead.appendChild(button);
        divAccordion.appendChild(divHead);

        const divExtra = createElement('div', 'extra');
        const p = createElement('p', "");

        divExtra.style.display = 'none';

        button.addEventListener('click', (event) => {
            if (event.target.textContent == 'More') {
                event.target.textContent = 'Less'
                event.target.parentElement.parentElement.querySelector('div[class="extra"]').style.display = 'block';
            } else if (event.target.textContent == 'Less') {
                event.target.textContent = 'More';
                event.target.parentElement.parentElement.querySelector('div[class="extra"]').style.display = 'none';
            }
        });

        await getContent(currentTitle._id, p);

        divExtra.appendChild(p);
        divAccordion.appendChild(divExtra);

        main.appendChild(divAccordion);

    }
}

solution();

async function getContent(id, p) {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
    const response = await fetch(url);
    const data = await response.json();
    const content = Object.values(data)[2];

    p.textContent = content;

}

async function getTitle() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const data = await response.json();
    const titles = Object.values(data);
    return (titles);
}


function createElement(type, clazz) {
    const element = document.createElement(type);

    if (clazz) {
        element.className = clazz;
    }
    return element;
}



