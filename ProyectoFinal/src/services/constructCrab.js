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
