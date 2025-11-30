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
    try {
        const res = await fetch(`http://localhost:3000/cangrejos/${crabId}`);
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
