import { loadYAML } from './loaders.js';
import { PATHS } from './constants.js';

async function buildSkillsHTML() {
    const skillsData = await loadYAML(PATHS.data + 'skills.yaml');
    let html = `
        <h2>
            <i class="fas fa-tools"></i> 
            Core Skills
        </h2>
        <div class="skills-grid">`
    for (const [category, content] of Object.entries(skillsData)) {
        html += `
            <div class="skill-category">
            <h3>${category}</h3>
            <ul>`;
        const skillsList = Array.isArray(content) ? content : Object.values(content).flat();
        skillsList.forEach(skill => html += `<li>${skill}</li>`);
        html += `</ul></div>`;
    }
    html += `</div>`;
    return html;
}


async function buildStaticSection(sectionPaths, loadPartialFn) {
    const { loadPartial } = await import('./loaders.js');
    const content = await Promise.all(
        // Object.values(sectionPaths).map(path => loadPartialFn(path))
        Object.values(sectionPaths).map(loadPartial)
    );
    return content.join(""); 
}

import { loadPartial } from './loaders.js';

async function buildStaticSections(sectionPaths) {
    const content = await Promise.all(
        Object.values(sectionPaths).map(loadPartial)
    );
    return content.join(""); 
}


export { buildSkillsHTML, buildStaticSections };
