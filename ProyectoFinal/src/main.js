import { router } from './router'; 
import { Navbar } from './components/Navbar'; 
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import './css/style.css'; 

document.querySelector('#app').innerHTML = ` 
  ${Header(Navbar())}
  <main id="view"></main> 
  ${Footer()}
`;

window.addEventListener('DOMContentLoaded', () => {
  router();
  window.addEventListener('hashchange', router);
});