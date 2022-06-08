import { teamDetailsTemplate } from "./teamDetailsTemplate.js";

//Dependencies router and renderHandler;
let _router = undefined;
let _renderHandler = undefined;
let _teamsService = undefined;
let _membersService = undefined;

//Dependency injection "constructor"
function initialize(router, renderHandler, teamsService, membersService) {
    _router = router;
    _renderHandler = renderHandler;
    _teamsService = teamsService;
    _membersService = membersService;
}

async function joinHandler(teamId) {
    let membership = {
        teamId
    };
    let result = await _membersService.create(membership);
    _router.redirect(`/details/${teamId}`)
}

async function approverHandler(membershipId,teamId) {
    let membership = {
        status: 'member'
    };
    let result = await _membersService.update(membership, membershipId);
    _router.redirect(`/details/${teamId}`)
}

async function leaveHandler(membershipId,teamId) {
    let result = await _membersService.deleteItemById(membershipId);
    _router.redirect(`/details/${teamId}`)
}


async function getView(context, next) {
    let teamId = context.params.teamId;

    let teamPromise = _teamsService.getById(teamId);
    let allMembersPromise = _membersService.getMembersForTeamWithUser(teamId);

    let [team, allMembers] = await Promise.all([teamPromise, allMembersPromise]);

    let status = undefined;
    let user = context.user;
    let memberShipId = undefined;

    if (user._id === team._ownerId) {
        status = 'owner';
    } else {
        let currentUserMember = allMembers.find(x => x._ownerId === user._id);
        if (currentUserMember.status === undefined) {
            status = 'nonMember';
        } else if (currentUserMember.status === 'pending') {
            memberShipId = currentUserMember._id;
            status = 'pending'
        } else if (currentUserMember.status === 'member') {
            memberShipId = currentUserMember._id;
            status = 'member';
        }
    }

    let onlyMembers = allMembers.filter(x => x.status === 'member');
    let pendingMembers = allMembers.filter(x => x.status === 'pending');

    team.userStatus = status;
    team.members = onlyMembers;
    team.pendingMembers = pendingMembers;
    team.userMemberShipId = memberShipId;
    team.joinHandler = joinHandler;
    team.leaveHandler = leaveHandler;
    team.approverHandler = approverHandler;

    let templateResult = teamDetailsTemplate(team);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}
