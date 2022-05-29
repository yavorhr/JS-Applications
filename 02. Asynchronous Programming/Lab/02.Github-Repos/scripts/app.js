function loadRepos() {
	const userName = document.getElementById('username').value;

	const url = `https://api.github.com/users/${userName}/repos`;

	fetch(url).then(response => response.json())
		.then(data => {
			const ulElement = document.getElementById('repos');
			ulElement.innerHTML = '';
			data.forEach(r => {
				const liElement = document.createElement('li');
				liElement.textContent = r.full_name;
				ulElement.appendChild(liElement);
			})
		});
}
