async function loadCommits() {
    const userName = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    const url = `https://api.github.com/repos/${userName}/${repo}/commits`;
    const ulElement = document.getElementById('commits');
    ulElement.innerHTML = '';

    try {
        const response = await fetch(url);
        if (response.status == 404) {
            throw new Error(`${response.status} ${(response.statusText)}`);
        }

        const data = await (response).json();
        console.log(data);

        data.forEach(c => {
            const liElement = document.createElement('li');
            liElement.textContent = `${c.commit.author.name}: ${c.commit.message}`;
            ulElement.appendChild(liElement);
        })
    } catch (error) {
        const liElement = document.createElement('li');
        liElement.textContent = `Error: ${error.message}`;
        ulElement.appendChild(liElement);
    }
}


