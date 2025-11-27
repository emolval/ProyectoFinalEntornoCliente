const URL = "http://localhost:3000/cangrejos";

export async function getAllCrabs() {
    try {
        const res = await fetch("http://localhost:3000/cangrejos");

        if (!res.ok) {
            throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("No se pudieron obtener los cangrejos:", error);
        return { cangrejos: [] };
    }
}


export async function getCrabById(crabId) {
    const res = await fetch(URL);
    const data = await res.json();
    return data.cangrejos.find(c => c.id === crabId);
}

export async function getSpecies(crabId, speciesId) {
    const res = await fetch(URL);
    const data = await res.json();

    const crab = data.cangrejos.find(c => c.id === crabId);
    if (!crab) return null;

    return crab.especies.find(e => e.id === speciesId);
}
