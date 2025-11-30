import { getCrabById } from "../services/JsonCalls.js";

export async function CrabDetails(id) { 
    const crab = await getCrabById(id); 
    if (!crab) { 
        return `<h2>Cangrejo no encontrado</h2>`; 
    } 
    
    return ` 
        <h2>${crab.nombre_comun}</h2> 
        <h3>${crab.nombre_cientifico}</h3> 
        <h5>${crab.categoria}</h5> 
        <img src=${crab.imagen}>
        <p>${crab.descripcion}</p> 
    `; 
}