import { matchesTemplate, townsTemplates } from "./templates/townTemplates.js";
import { render } from "../node_modules/lit-html/lit-html.js"
import { towns } from "./towns.js";

let townsDiv = document.getElementById('towns');
let baseTowns = towns.map(t => ({ name: t }));
let resultDiv = document.getElementById('result');

render(townsTemplates(baseTowns), townsDiv);

document.getElementById('search-btn').addEventListener('click', search);

function search() {
   let searchInput = document.getElementById('searchText');
   let searchText = searchInput.value.toLowerCase();

   let allTowns = towns.map(t => ({ name: t }));
   let matchedTowns = allTowns.filter(t => t.name.toLowerCase().includes(searchText));
   let matches = matchedTowns.length;

   matchedTowns.forEach(t => t.class = 'active');

   // allTowns with 'active' class for the matched towns. Passed by reference.
   render(townsTemplates(allTowns), townsDiv);
   render(matchesTemplate(matches), resultDiv);
}
