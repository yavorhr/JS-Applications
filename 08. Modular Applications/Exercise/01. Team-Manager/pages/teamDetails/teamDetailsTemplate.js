import { html } from '../../node_modules/lit-html/lit-html.js';

export let teamDetailsTemplate = (team) => html`
    <section id="team-home">
        <article class="layout">
            <img src="${team.logoUrl}" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${team.members.length} members</span>
                <div>
                    ${team.userStatus === 'owner' 
                    ? html`<a href="/edit/${team._id}" class="action">Edit team</a>` 
                    : ''
                    }

                    ${team.userStatus === 'nonMember' 
                    ? html`<a href="javascript:void(0)" @click=${(e)=>team.joinHandler(team._id,e)} class="action">Join team</a>` 
                    : ''
                    }

                    ${team.userStatus === 'member' 
                    ? html`<a href="javascript:void(0)" @click=${(e)=>team.leaveHandler(team.userMemberShipId ,team._id,e)} class="action invert">Leave team</a>` 
                    : ''
                    }   

                    ${team.userStatus === 'pending' 
                    ? html`Membership pending. <a @click=${(e)=>team.leaveHandler(team.userMemberShipId,team._id,e)}href="javascript:void(0)" >Cancel request</a>` 
                    : ''
                    }   
                </div>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">  
                ${team.members.map(m=> memberTemplate(m,team.userStatus,team.leaveHandler,team))}
                </ul>
            </div>
            <div class="pad-large">
                <h3>Membership Requests</h3>
                <ul class="tm-members">
                    ${team.pendingMembers.map(p => pendingMemberTemplate(p,team.userStatus,team.approverHandler,team.leaveHandler,team))}
                </ul>
            </div>
        </article>
    </section>
`;

let memberTemplate = (member,status,leaveHandler,team) => html`
    <li>
    ${member.user.username};
    ${status === 'owner' 
    ? html`<a href="javascript:void(0)" @click=${(e)=>leaveHandler(member._id,team._id,e)} class="tm-control action">Remove from team</a>`
    : ''}
    </li>
`;

let pendingMemberTemplate = (pendingMember,status,approverHandler,leaveHandler,team) => html`
    <li>${pendingMember.user.username} 
  ${status === 'owner' 
  ? html`<a href="javascript:void(0)" @click=${(e)=>approverHandler(pending._id,team._id,e)}  class="tm-control action">Approve</a>`
  : ''} 
   ${status === 'owner' 
   ? html`<a href="javascript:void(0)"  @click=${(e)=>leaveHandler(pending._id,team._id,e)} class="tm-control action">Decline</a>`
   : ''}
    </li>
`;