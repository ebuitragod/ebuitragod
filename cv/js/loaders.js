async function loadPartial(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to load ${url}:
                ${response.status} ${response.statusText}`
            )
        }
        return response.text();
    } catch (error) {
        console.error('Error al cargar el parcial:', error);
        return '';
    }
}

async function loadYAML(url) {
    const response = await fetch(url);
    const yamlText = await response.text();
    return jsyaml.load(yamlText);
}


export { loadPartial, loadYAML };  
