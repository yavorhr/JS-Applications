import {html,nothing} from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (pet,sumDonation) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${pet.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: ${pet.sumDonation}</h4>
                </div>
                
                ${pet.isOwner
                    ? html`
                    <div class="actionBtn">
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a  @click=${(e)=> pet.deleteHandler(pet._id, e)}  href="javascript:void(0)" class="remove">Delete</a>`
                    : nothing } 

                    ${pet.canDonate
                    ? html `<a  @click=${(e)=> pet.donateHandler(pet._id, e)} href="javascript:void(0)" class="donate">Donate</a>`
                : nothing }
                </div> 
            </div>
        </div>
    </section>
`;