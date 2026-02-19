// script.js
async function loadPartial(url) {
    const response = await fetch(url);
    return response.text();
}

async function loadAllPartials() {
    const container = document.getElementById('cv-container');
    
    const header = await loadPartial('cv/sections/header.html');
    const mainContent = `
        <div class="main-content">
            ${await loadPartial('cv/sections/main-content/profile.html')}
            ${await loadPartial('cv/sections/main-content/experience.html')}
            ${await loadPartial('cv/sections/main-content/projects.html')}
        </div>
    `;
    const sidebar = `
        <div class="sidebar">
            ${await loadPartial('cv/sections/sidebar/skills.html')}
            ${await loadPartial('cv/sections/sidebar/education.html')}
            ${await loadPartial('cv/sections/sidebar/certifications.html')}
            ${await loadPartial('cv/sections/sidebar/languages.html')}
        </div>
    `;
    const footer = await loadPartial('cv/sections/footer.html');
    
    container.innerHTML = header + mainContent + sidebar + footer;
}

document.addEventListener('DOMContentLoaded', loadAllPartials);
