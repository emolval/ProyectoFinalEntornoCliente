import { getAllCrabs } from "./JsonCalls";

export async function groupCrabsByCategory() {
    const crabs = await getAllCrabs();
    const grupos = {};

    crabs.forEach(crab => {
        const category = crab.categoria;
        if (!grupos[category]) {
            grupos[category] = [];
        }
        grupos[category].push(crab);
    });

    return grupos;
}

export async function constructCrabsCarrusel() {
    const crabs = await getAllCrabs();

    const carrusel = document.querySelector("#crabList");
    if (!carrusel) {
        console.error("#crabList no existe en el DOM");
        return;
    }

    carrusel.innerHTML = "";

    crabs.forEach(c => {
        const img = document.createElement("img");
        img.src = c.imagen;
        img.alt = c.nombre;
        img.classList.add("carousel-img");
        img.addEventListener('click', () => {
            window.location.href = `#/cangrejos/${c.id}`;
        });
        carrusel.appendChild(img);
    });

    const images = Array.from(carrusel.children);
    let currentIndex = 0;


    // A partir de aqui se forma el carrusel, inspiracion de https://es.stackoverflow.com/questions/606701/crear-un-carrousel-manual-y-a-la-vez-autom%C3%A1tico
    // Aunque no es igual y tiene muchos cambios, por ejemplo, el mio no es manual, y usa solo 3 imagenes que se ocultan por detras en vez de un slide


    function updateCarousel() {
        images.forEach(img => {
            img.classList.remove("active", "prev", "next");
            img.style.transform = "translateX(0) scale(1) rotateY(0deg)";
            img.style.zIndex = 1;
            img.style.opacity = 0.5;
        });

        const center = currentIndex;
        const prev = (currentIndex - 1 + images.length) % images.length;
        const next = (currentIndex + 1) % images.length;

        images[center].classList.add("active");
        images[center].style.transform = "translateX(0) scale(1.5) rotateY(0deg)";
        images[center].style.zIndex = 3;
        images[center].style.opacity = 1;

        images[prev].classList.add("prev");
        images[prev].style.transform = "translateX(-120px) scale(1.2) rotateY(30deg)";
        images[prev].style.zIndex = 2;
        images[prev].style.opacity = 0.8;

        images[next].classList.add("next");
        images[next].style.transform = "translateX(120px) scale(1.2) rotateY(-30deg)";
        images[next].style.zIndex = 2;
        images[next].style.opacity = 0.8;
    }

    const prevButton = document.createElement("button");
    prevButton.textContent = "⫷";
    prevButton.classList.add("carousel-btn", "prev-btn");
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "⫸";
    nextButton.classList.add("carousel-btn", "next-btn");
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    let div = document.createElement("div");
    div.id = "buttonDiv";
    div.appendChild(prevButton);
    div.appendChild(nextButton);
    carrusel.parentElement.parentElement.appendChild(div);

    updateCarousel();
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }, 3000);
}

// Aprendi a usar el draggable así, y además recibí mucha ayuda de COPILOT para esta parte, ya que 
// no conseguía hacerla funcionar por mi mismo
// LO que yo he implementado por mi mismo es la funcionalidad del localSTorage por completo
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/draggable

export async function buildTierList() {
    const view = document.querySelector("#view");
    view.innerHTML = "<h2>Tier List de Cangrejos</h2>";

    const container = document.createElement("div");
    container.classList.add("tier-container");
    view.appendChild(container);

    const unassigned = document.createElement("div");
    unassigned.id = "unassigned";
    unassigned.innerHTML = "<h3>Sin clasificar</h3>";
    view.appendChild(unassigned);

    const tiers = ["S", "A", "B", "C", "D"];

    tiers.forEach(t => {
        const row = document.createElement("div");
        row.classList.add("tier-row");

        const label = document.createElement("div");
        label.classList.add("tier-label", `tier-${t}`);
        label.textContent = t;

        const dropzone = document.createElement("div");
        dropzone.classList.add("tier-dropzone");
        dropzone.dataset.tier = t;

        dropzone.addEventListener("dragover", e => e.preventDefault());
        dropzone.addEventListener("drop", e => {
            e.preventDefault();
            const id = e.dataTransfer.getData("id");
            const item = document.querySelector(`.item[data-id="${id}"]`);
            if (item) {
                dropzone.appendChild(item);
                saveTierList();
            }
        });

        row.appendChild(label);
        row.appendChild(dropzone);
        container.appendChild(row);
    });

    const crabs = await getAllCrabs();

    loadTierList(crabs);

    const savedData = JSON.parse(localStorage.getItem("tierListCrabs") || "{}");

    const classifiedIds = new Set();
    Object.values(savedData).forEach(arr => arr.forEach(id => classifiedIds.add(Number(id))));

    crabs.forEach(c => {
        if (!classifiedIds.has(Number(c.id))) {
            const item = document.createElement("img");
            item.classList.add("item");
            item.draggable = true;
            item.src = c.imagen;
            item.dataset.id = c.id;

            item.addEventListener("dragstart", e => {
                e.dataTransfer.setData("id", c.id);
            });

            unassigned.appendChild(item);
        }
    });

    return "";
}

function saveTierList() {
    const tiers = document.querySelectorAll(".tier-dropzone");
    const data = {};

    tiers.forEach(tier => {
        const tierName = tier.dataset.tier;
        const ids = Array.from(tier.children)
            .filter(child => child.classList.contains("item"))
            .map(item => Number(item.dataset.id));
        data[tierName] = ids;
    });

    localStorage.setItem("tierListCrabs", JSON.stringify(data));
}

function loadTierList(crabs) {
    const data = JSON.parse(localStorage.getItem("tierListCrabs") || "{}");

    Object.keys(data).forEach(tierName => {
        const dropzone = document.querySelector(`.tier-dropzone[data-tier="${tierName}"]`);
        if (!dropzone) return;

        data[tierName].forEach(id => {
            const crab = crabs.find(c => c.id == id);
            if (!crab) return;

            const item = document.createElement("img");
            item.classList.add("item");
            item.draggable = true;
            item.src = crab.imagen;
            item.dataset.id = crab.id;

            item.addEventListener("dragstart", e => {
                e.dataTransfer.setData("id", crab.id);
            });

            dropzone.appendChild(item);
        });
    });

    // Cosecha propia

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset TierList";
    resetBtn.addEventListener("click", () => {
        localStorage.removeItem("tierListCrabs");
        location.reload();
    });

    view.appendChild(resetBtn);

}
