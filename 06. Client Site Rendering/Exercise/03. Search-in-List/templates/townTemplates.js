import { html } from './../../node_modules/lit-html/lit-html.js';
import { ifDefined } from './../../node_modules/lit-html/directives/if-defined.js';

// town.class = 'active'
export let townTemplate = (town) => html`
<li class="${town.class}">${ifDefined(town.name)}</li>
`
export let townsTemplates = (towns) => html`
    <ul>
        ${towns.map(t => townTemplate(t))}
    </ul>
`

export let matchesTemplate = (matches) => html` 
<span>${matches} matches found</span>
`