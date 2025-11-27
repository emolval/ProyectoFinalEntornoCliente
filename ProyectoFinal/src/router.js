import { Home } from './views/Home'; 
import { About } from './views/About'; 
import { NotFound } from './views/NotFound'; 
import { Masoneria } from './views/Masoneria';
import { constructCrabsCarrusel } from './services/constructCrab';

export function router() { 
    const view = document.getElementById('view'); 
    const route = location.hash.slice(1).toLowerCase() || '/'; 
    
    const routes = { 
        '/': Home, 
        '/about': About,
        '/masoneria': Masoneria,
    };  

    const screen = routes[route] || NotFound; 
    view.innerHTML = screen(); 

    if (screen === Home) {
        constructCrabsCarrusel();
    }
}
