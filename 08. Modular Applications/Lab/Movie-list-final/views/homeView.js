import { html } from '../node_modules/lit-html/lit-html.js';

let homeTemplate = () => html`
    <section>
        <h2>Home page</h2>
    
        <p>Lorem ipsum</p>
    </section>
`;

export function homePage(context) {
    context.render(homeTemplate());
}