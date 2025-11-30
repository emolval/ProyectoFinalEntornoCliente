import { Home } from './views/Home'; 
import { About } from './views/About'; 
import { NotFound } from './views/NotFound'; 
import { CrabList } from './views/CrabList';
import { CrabDetails } from "./views/CrabDetails";
import { constructCrabsCarrusel, groupCrabsByCategory } from './services/constructCrab';

export function router() { 
    const view = document.getElementById('view'); 
    const route = location.hash.slice(1).toLowerCase();
    const parts = route.split("/");
    
    const routes = { 
        '/': Home, 
        '/about': About,
        '/crablist': CrabList,
        '/cangrejos': () => "<h2>Lista de cangrejos</h2>",
    };  

    if (parts[1] === "cangrejos") { 
        const id = parts[2]; 
        CrabDetails(id).then(html => {
            view.innerHTML = html;
        });
        return; 
    } 

    const screen = routes[route] || NotFound; 
    view.innerHTML = screen(); 

    if (screen === Home) {
        constructCrabsCarrusel();
    } else if (screen === CrabList) {
        view.innerHTML = `<div id="crabContainer"></div>`;
        CrabList();
    } else {
        view.innerHTML = screen(); 
    }
}
