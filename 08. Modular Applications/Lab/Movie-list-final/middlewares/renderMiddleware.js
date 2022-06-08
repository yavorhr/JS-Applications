import { render } from '../node_modules/lit-html/lit-html.js';

import { renderNavigation } from '../views/navigationView.js';

let rootElement = document.querySelector('.root');
let navigationElement = document.querySelector('.navigation');

const contextRender = templateResult => {
    render(templateResult, rootElement)
};

export function renderMiddleware(context, next) {
    render(renderNavigation(context),navigationElement);
    
    context.render = contextRender;

    next();
}