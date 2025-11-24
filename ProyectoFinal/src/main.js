import { router } from './router'; 
import { Navbar } from './components/Navbar'; 
import './css/style.css'; 

document.querySelector('#app').innerHTML = ` 
  ${Navbar()} 
  <main id="view"></main> 
`; 

router(); 
window.addEventListener('hashchange', router);