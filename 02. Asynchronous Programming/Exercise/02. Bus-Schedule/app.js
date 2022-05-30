function solve() {
    const departBtn = document.querySelector('input[value ="Depart"]');
    const arriveBtn = document.querySelector('input[value ="Arrive"]');
    let infoSpan = document.querySelector('#info span');

    let stop = {
        next: 'depot'
    }

    async function depart() {

        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stop.next;
        const response = await fetch(url);
        const data = await response.json();

        stop = data;

        infoSpan.textContent = `Next stop ${stop.name}`

        departBtn.disabled = true;
        arriveBtn.disabled = false;


    }

    function arrive() {

        infoSpan.textContent = `Arrived at ${stop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();