async function getInfo() {
    let inputUser = document.getElementById('stopId');
    let id = inputUser.id;
    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + id;
    const name = document.getElementById('stopName');

    try {
        const response = await fetch(url);
        const data = await response.json();

        const stops = document.getElementById('buses');
        stops.innerHTML = '';

        name.textContent = data.name;
        Object.entries(data.buses).map(createLi);

        function createLi(arr) {
            const li = document.createElement('li');
            li.textContent = `Bus ${arr[0]} arrives in ${arr[1]} minutes`;
            stops.appendChild(li);
        }

        inputUser.value = '';
    } catch (error) {
        document.getElementById('stopName').textContent = 'Error';
    }
}
