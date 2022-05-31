let catches = document.getElementById('catches');

function addEventListeners() {
    catches.innerHTML = '';
    document

    if (!sessionStorage.getItem('token')) {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('logged').style.display = 'none';
    } else {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('logged').style.display = 'inline-block';

        document.getElementById('addCatchBtn').disabled = false;
        document.getElementById('addCatchBtn').addEventListener('click', addAcatch);
        document.getElementById('loadCatches').addEventListener('click', loadAllCatches);

        document.getElementById('logged').addEventListener('click', () => {
            sessionStorage.clear();
        });
    }
}

addEventListeners();

async function loadAllCatches() {
    catches.innerHTML = '';

    const response = await fetch('http://localhost:3030/data/catches');

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        return;
    }

    //[{},{},{}]
    const data = await response.json();

    Object.values(data).forEach(c => {
        const element = e('div', { className: 'catch' },
            e('label', {}, 'Angler'),
            e('input', { type: 'text', className: 'angler', value: `${c.angler}` }),
            e('hr', {}),
            e('label', {}, 'Weight'),
            e('input', { type: 'number', className: 'weight', value: `${c.weight}` }),
            e('hr', {}),
            e('species', {}, 'Species'),
            e('input', { type: 'text', className: 'species', value: `${c.species}` }),
            e('hr', {}),
            e('label', {}, 'Location'),
            e('input', { type: 'text', className: 'location', value: `${c.location}` }),
            e('hr', {}),
            e('label', {}, 'Bait'),
            e('input', { type: 'text', className: 'bait', value: `${c.bait}` }),
            e('hr', {}),
            e('label', {}, 'Capture Time'),
            e('input', { type: 'number', className: 'captureTime', value: `${c['captureTime ']}` }),
            e('hr', {}),
            e('button', { disabled: true, className: 'update' }, 'Update'),
            e('button', { disabled: true, className: 'delete' }, 'Delete')
        );



        if (c._ownerId === sessionStorage.getItem('id')) {
            //UPDATE FUNCTIONALITY
            const updateButton = element.querySelector('.update');
            updateButton.disabled = false;

            updateButton.addEventListener('click', async (event) => {
                const catchForm = event.target.parentNode.children;
                const angler = catchForm[1].value;
                const weight = catchForm[4].value;
                const species = catchForm[7].value;
                const location = catchForm[10].value;
                const bait = catchForm[13].value;
                const captureTime = catchForm[16].value;

                if (!angler || !species || !location || !bait || !Number(weight) || !Number(captureTime)) {
                    alert('Please enter all fields in valid type');
                    return
                };

                const updatedCatch = { catchForm, angler, weight: Number(weight), species, location, bait, 'captureTime ': Number(captureTime) };
                updateCatch(c._id, updatedCatch);
            });

            //DELETE FUNCTIONALITY
            const deleteButton = element.querySelector('.delete');
            deleteButton.disabled = false;

            deleteButton.addEventListener('click', async () => {
                const confimation = confirm('Are you sure you want to delete your catch?');

                if (confimation) {
                    deleteCatch(c._id);
                }
            });
        };
        catches.appendChild(element);
    })

}

async function addAcatch(event) {
    const fields = event.target.parentNode;
    const angler = fields.querySelector('input[class=angler]').value;
    const weight = fields.querySelector('input[class=weight]').value;
    const species = fields.querySelector('input[class=species]').value;
    const location = fields.querySelector('input[class=location]').value;
    const bait = fields.querySelector('input[class=bait]').value;
    const captureTime = fields.querySelector('input[class=captureTime]').value;

    if (!angler || !species || !location || !bait || !Number(weight) || !Number(captureTime)) {
        alert('Please enter all fields in valid type');
        return;
    }

    const object = { angler, weight: Number(weight), species, location, bait, 'captureTime ': Number(captureTime) };

    document.querySelector('#addForm [class="angler"]').value = '';
    document.querySelector('#addForm [class="weight"]').value = '';
    document.querySelector('#addForm [class="species"]').value = '';
    document.querySelector('#addForm [class="location"]').value = '';
    document.querySelector('#addForm [class="bait"]').value = '';
    document.querySelector('#addForm [class="captureTime"]').value = '';

    const token = sessionStorage.getItem('token');

    response = await fetch('http://localhost:3030/data/catches', {
        method: 'post',
        headers: { 'Content-type': 'application/json', 'X-Authorization': (token) },
        body: JSON.stringify(object)
    });

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        return;
    }
    loadAllCatches();
}

async function deleteCatch(id) {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json', 'X-Authorization': (token) }
    });

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        return;
    }
    loadAllCatches();
}

async function updateCatch(id, object) {
    const token = sessionStorage.getItem('token');

    const response = await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json', 'X-Authorization': (token) },
        body: JSON.stringify(object)
    });

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        return;
    }
    loadAllCatches();

}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });
    return result;
}
//load all catches
//update a ctach
//delete a catch
//add a catch