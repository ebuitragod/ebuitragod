import { PATHS } from "./constants.js";
// ESPE cuidado con loadYAML por si se usa directamente
import { loadPartial, loadYAML } from "./loaders.js";
import { buildSkillsHTML, buildStaticSections } from "./builders.js";
import { initializeInteractivity } from "./interactivity.js";

async function loadAllPartials() {
    const container = document.getElementById('cv-container');
    if (!container) {
        console.error('CV container element not found!');
        return;
    }
    try {
        const [header, footer] = await Promise.all([
            loadPartial(PATHS.header),
            loadPartial(PATHS.footer)
        ]);
        const mainStatic = await buildStaticSections(PATHS.main);
        const mainContent = `
            <div class="main-content">
                ${mainStatic}
            </div>
        `;

        const sidebarStatic = await buildStaticSections(PATHS.sidebarStatic);
        const skillsHTML = await buildSkillsHTML();
        const sidebar = `
            <div class="sidebar">
                ${sidebarStatic}
                ${skillsHTML}
            </div>
        `;

        container.innerHTML = `
            ${header}
            ${mainContent}
            ${sidebar}
            ${footer}
        `;
        console.log('All CV sections loaded successfully!');
    } catch (error) {
        console.error('Hubo un errror al cargar las secciones del CV:', error);
        container.innerHTML = " \
            <p> \
                Sorry, there was an error loading the CV. Please contact me at \
                ebuitragod@gmail.com, and I will happily send this CV in PDF. \
            </p>"
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadAllPartials();
    initializeInteractivity();
});

