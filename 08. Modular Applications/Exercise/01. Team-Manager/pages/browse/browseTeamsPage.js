import { browseTeamsTemplate } from "./browseTemplate.js";


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


async function getView(context, next) {
    let teams = await _teamsService.getAll();
    let allMembers = await _membersService.getOnlyMembers();

    teams.forEach(t => t.membersCount = allMembers.filter(m => m.teamId === t._id).length);

    let viewModel = {
        teams
    }

    let templateResult = browseTeamsTemplate(viewModel);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}
