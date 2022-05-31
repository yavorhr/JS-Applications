const textArea = document.getElementById('messages');
function attachEvents() {
    document.getElementById('refresh').addEventListener('click', getData);
    document.getElementById('submit').addEventListener('click', sendData);
}
attachEvents();

async function sendData() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const inputName = document.querySelector('input[name="author"]').value;
    const inputMessage = document.querySelector('input[name="content"]').value;
    const inputData = { author: `${inputName}`, content: `${inputMessage}` };
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'applicatFion/json' },
        body: JSON.stringify(inputData)
    });

    const data = await response.json();
    if (data.author && data.content) {
        textArea.textContent += `${data.author}:${data.content}\n`;
    }

    // const data = await response.json();
}

async function getData() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();
    const dataAsArray = Object.values(data);
    let result = [];
    for (const authorsContent of dataAsArray) {
        result.push(`${authorsContent.author}:${authorsContent.content}`);
    }
    textArea.textContent = result.join('\n');
    /*
1: Object { author: "Garry", content: "Yep, whats up :?" }
    */
}

