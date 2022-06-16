import { html } from '../../node_modules/lit-html/lit-html.js';

export let profileTemplate = (user, myEvents) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${myEvents.length === 0 
        ? html`
            <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`
        : myEvents.map(eventTemplate)}
    </div>
</section>
`;

let eventTemplate = (event) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src="${event.imageUrl}">
        <h2>${event.title}</h2>
        <h6>${event.date}</h6>
        <a href="/details/${event._id}" class="details-button">Details</a>
    </div>
</div>
`;