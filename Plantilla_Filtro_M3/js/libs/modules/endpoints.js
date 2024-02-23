
export const addRegister = async (url, data) => {
    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        alert("Registro de datos exitoso");
    } catch (error) {
        console.error("Error al agregar datos:", error);
    }
};

export const updateRegister = async (url, id, data) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Error al actualizar datos:", error);
    }
};

export const deleteRegister = async (url, id) => {
    try {
        await fetch(`${url}/${id}`, { method: "DELETE" });
        
    } catch (error) {
        console.error("Error al eliminar datos:", error);
    }
};