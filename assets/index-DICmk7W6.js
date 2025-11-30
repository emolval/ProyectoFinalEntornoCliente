(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();function h(){return` 
        <section> 
        <div class="carousel-wrapper">
            <div class="carousel-container" id="crabList">
                <div class="carousel-track"></div>
            </div>
        </div>
        </section>
    `}function L(){return` 
        <section> 
            <h1>Sobre este proyecto</h1>
            <p>Esta web fue creada para aprender a trabajar con Javascript y mostrar información sobre diferentes especies de cangrejos.</p>
            <p>Está construida usando Vite Vanilla</p>
            <p>Esperamos que disfrutes explorando y aprendiendo sobre estos increíbles invertebrados.</p>
        </section> 
    `}function y(){return`
        <section> 
            <h1>404</h1> 
            <p>Página no encontrada.</p> 
        </section>
    `}async function f(){try{const r=await fetch("http://localhost:3000/cangrejos");if(!r.ok)throw new Error(`Error en la petición: ${r.status} ${r.statusText}`);return await r.json()}catch(r){return console.error("No se pudieron obtener los cangrejos:",r),{cangrejos:[]}}}async function E(r){try{const e=await fetch(`http://localhost:3000/cangrejos/${r}`);if(!e.ok)throw new Error(`Error en la petición: ${e.status} ${e.statusText}`);return await e.json()}catch(e){return console.error("No se pudieron obtener los cangrejos:",e),{cangrejos:[]}}}async function C(){const r=await f(),e={};return r.forEach(t=>{const o=t.categoria;e[o]||(e[o]=[]),e[o].push(t)}),e}async function w(){const r=await f(),e=document.querySelector("#crabList");if(!e){console.error("#crabList no existe en el DOM");return}e.innerHTML="",r.forEach(s=>{const d=document.createElement("img");d.src=s.imagen,d.alt=s.nombre,d.classList.add("carousel-img"),d.addEventListener("click",()=>{window.location.href=`#/cangrejos/${s.id}`}),e.appendChild(d)});const t=Array.from(e.children);let o=0;function n(){t.forEach(u=>{u.classList.remove("active","prev","next"),u.style.transform="translateX(0) scale(1) rotateY(0deg)",u.style.zIndex=1,u.style.opacity=.5});const s=o,d=(o-1+t.length)%t.length,l=(o+1)%t.length;t[s].classList.add("active"),t[s].style.transform="translateX(0) scale(1.5) rotateY(0deg)",t[s].style.zIndex=3,t[s].style.opacity=1,t[d].classList.add("prev"),t[d].style.transform="translateX(-120px) scale(1.2) rotateY(30deg)",t[d].style.zIndex=2,t[d].style.opacity=.8,t[l].classList.add("next"),t[l].style.transform="translateX(120px) scale(1.2) rotateY(-30deg)",t[l].style.zIndex=2,t[l].style.opacity=.8}const a=document.createElement("button");a.textContent="⫷",a.classList.add("carousel-btn","prev-btn"),a.addEventListener("click",()=>{o=(o-1+t.length)%t.length,n()});const c=document.createElement("button");c.textContent="⫸",c.classList.add("carousel-btn","next-btn"),c.addEventListener("click",()=>{o=(o+1)%t.length,n()});let i=document.createElement("div");i.id="buttonDiv",i.appendChild(a),i.appendChild(c),e.parentElement.parentElement.appendChild(i),n(),setInterval(()=>{o=(o+1)%t.length,n()},3e3)}async function x(){const r=document.querySelector("#view");r.innerHTML="<h2>Tier List de Cangrejos</h2>";const e=document.createElement("div");e.classList.add("tier-container"),r.appendChild(e);const t=document.createElement("div");t.id="unassigned",t.innerHTML="<h3>Sin clasificar</h3>",r.appendChild(t),["S","A","B","C","D"].forEach(i=>{const s=document.createElement("div");s.classList.add("tier-row");const d=document.createElement("div");d.classList.add("tier-label",`tier-${i}`),d.textContent=i;const l=document.createElement("div");l.classList.add("tier-dropzone"),l.dataset.tier=i,l.addEventListener("dragover",u=>u.preventDefault()),l.addEventListener("drop",u=>{u.preventDefault();const v=u.dataTransfer.getData("id"),m=document.querySelector(`.item[data-id="${v}"]`);m&&(l.appendChild(m),T())}),s.appendChild(d),s.appendChild(l),e.appendChild(s)});const n=await f();j(n);const a=JSON.parse(localStorage.getItem("tierListCrabs")||"{}"),c=new Set;return Object.values(a).forEach(i=>i.forEach(s=>c.add(Number(s)))),n.forEach(i=>{if(!c.has(Number(i.id))){const s=document.createElement("img");s.classList.add("item"),s.draggable=!0,s.src=i.imagen,s.dataset.id=i.id,s.addEventListener("dragstart",d=>{d.dataTransfer.setData("id",i.id)}),t.appendChild(s)}}),""}function T(){const r=document.querySelectorAll(".tier-dropzone"),e={};r.forEach(t=>{const o=t.dataset.tier,n=Array.from(t.children).filter(a=>a.classList.contains("item")).map(a=>Number(a.dataset.id));e[o]=n}),localStorage.setItem("tierListCrabs",JSON.stringify(e))}function j(r){const e=JSON.parse(localStorage.getItem("tierListCrabs")||"{}");Object.keys(e).forEach(o=>{const n=document.querySelector(`.tier-dropzone[data-tier="${o}"]`);n&&e[o].forEach(a=>{const c=r.find(s=>s.id==a);if(!c)return;const i=document.createElement("img");i.classList.add("item"),i.draggable=!0,i.src=c.imagen,i.dataset.id=c.id,i.addEventListener("dragstart",s=>{s.dataTransfer.setData("id",c.id)}),n.appendChild(i)})});const t=document.createElement("button");t.textContent="Reset TierList",t.addEventListener("click",()=>{localStorage.removeItem("tierListCrabs"),location.reload()}),view.appendChild(t)}async function p(){const r=await C(),e=document.querySelector("#crabContainer");if(!e){console.error("#crabContainer no existe en el DOM");return}e.innerHTML="";for(const t in r){const o=document.createElement("h3");o.textContent=t,e.appendChild(o),r[t].forEach(n=>{const a=document.createElement("p");a.textContent=n.nombre_comun+" ("+n.nombre_cientifico+")",a.addEventListener("click",()=>{window.location.href=`#/cangrejos/${n.id}`}),e.appendChild(a)})}}async function S(r){const e=await E(r);return e?` 
        <h2>${e.nombre_comun}</h2> 
        <h3>${e.nombre_cientifico}</h3> 
        <h5>${e.categoria}</h5> 
        <img class="crabImg" src=${e.imagen}>
        <p>${e.descripcion}</p> 
    `:"<h2>Cangrejo no encontrado</h2>"}function g(){return`
        <h2>Tier List</h2>

        <div id="items">
        </div>
    `}function b(){const r=document.getElementById("view"),e=location.hash.slice(1).toLowerCase(),t=e.split("/"),o={"/":h,"/about":L,"/crablist":p,"/tierlist":g,"/cangrejos":()=>"<h2>Lista de cangrejos</h2>"};if(t[1]==="cangrejos"){const a=t[2];S(a).then(c=>{r.innerHTML=c});return}const n=o[e]||y;r.innerHTML=n(),n===h?w():n===p?(r.innerHTML='<div id="crabContainer"></div>',p()):n===g?x():r.innerHTML=n()}function $(){return` 
        <nav> 
            <a href="#/">Inicio</a> 
            <a href="#/crablist">Lista de Cangrejos</a>
            <a href="#/tierlist">Tier List</a>
            <a href="#/about">Sobre nosotros</a> 
        </nav>
    `}function I(r){return` 
        <header> 
            <h1>Welcome to Crab Web</h1>
            ${r}
        </header>
    `}function M(){return` 
        <footer>
            <p>Copyright &copy; Masonery Website 2025</p></div>
        </footer>
    `}document.querySelector("#app").innerHTML=` 
  ${I($())}
  <main id="view"></main> 
  ${M()}
`;window.addEventListener("DOMContentLoaded",()=>{b(),window.addEventListener("hashchange",b)});
