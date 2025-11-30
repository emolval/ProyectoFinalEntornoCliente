import { groupCrabsByCategory } from "../services/constructCrab.js";

export async function CrabList() { 
    const cangrejos = await groupCrabsByCategory();

    const container = document.querySelector("#crabContainer");
    if (!container) {
        console.error("#crabContainer no existe en el DOM");
        return;
    }

    container.innerHTML = "";

    for (const categoria in cangrejos) {
        const h3 = document.createElement("h3");
        h3.textContent = categoria;
        container.appendChild(h3);

        cangrejos[categoria].forEach(crab => {
            const p = document.createElement("p");
            p.textContent = crab.nombre_comun + " (" + crab.nombre_cientifico + ")";
            p.addEventListener('click', () => {
                window.location.href = `#/cangrejos/${crab.id}`;
            });
            container.appendChild(p);
        });
    }
}