//  SET UP PATHS 
const BASED_PATH = 'cv/sections/';
const MAIN_CONTENT_PATH = BASED_PATH + 'main-content/';
const SIDEBAR_PATH = BASED_PATH + 'sidebar/';

const PATHS = {
    header: BASED_PATH + 'header.html',
    mainContent: {
        profile: MAIN_CONTENT_PATH + 'profile.html',
        experience: MAIN_CONTENT_PATH + 'experience.html',
        projects: MAIN_CONTENT_PATH + 'projects.html'
    },
    sidebar: {
        // skills: SIDEBAR_PATH + 'skills.html',
        education: SIDEBAR_PATH + 'education.html',
        certifications: SIDEBAR_PATH + 'certifications.html',
        languages: SIDEBAR_PATH + 'languages.html'
    },
    footer: BASED_PATH + 'footer.html'
};


async function loadPartial(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }
        return response.text();
    } catch (error) {
        console.error('Error loading partial:', error);
        return ''; 
    }
}


// Function to load skills from skills.yml >> cv/sections/sidebar/skills.html
// and display them in the skills section
async function buildSkillsHTML() {
    const response = await fetch('/skills.yaml');
    const yamlText = await response.text();
    const skillsData = jsyaml.load(yamlText);

    let html = `<h2><i class="fas fa-tools"></i> Core Skills</h2><div class="skills-grid">`;

    for (const [category, content] of Object.entries(skillsData)) {
        html += `<div class="skill-category"><h3>${category}</h3><ul>`;
        const skillsList = Array.isArray(content) ? content : Object.values(content).flat();
        skillsList.forEach(skill => html += `<li>${skill}</li>`);
        html += `</ul></div>`;
    }
    html += `</div>`;
    return html;
}


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

        async function loadSection(sectionPath) {
            const content = await Promise.all(
                Object.values(sectionPath).map(path => loadPartial(path))
            );
            return content.join('');
        }

        const [mainContent, sidebarStatic] = await Promise.all([
            loadSection(PATHS.mainContent),
            loadSection(PATHS.sidebar)
        ]);
        
        const skillsHTML = await buildSkillsHTML();

        // Build complet sidebar 
        const sidebar = `
            <div class="sidebar">
                ${sidebarStatic}
                ${skillsHTML}
            </div>
        `;

        container.innerHTML = `
            ${header}
            <div class="main-content">
                ${mainContent}
            </div>
            <div class="sidebar">
                ${sidebar}
                </div>
            ${footer}
        `;
        console.log('All CV sections loaded successfully!');
    } catch (error) {
        console.error('Error loading CV sections:', error);
        container.innerHTML = '<p>Sorry, there was an error loading the CV. Please contact me to ebuitragod@gmail.com, and I will happily send this CV in pdf.</p>';
    }
}


// ===== INTERACTIVITY FUNCTIONALITY =====
function initializeInteractivity() {
    const printButton = document.getElementById('print-btn');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    console.log('CV loaded successfully!');
    console.log('\
        This CV was built with HTML/CSS/JS and is optimized for \
        both web and print, preferably viewed in Chrome or Edge for best \
        results. For any inquiries, please contact me at ebuitragod@gmail.com\
        ');

}


document.addEventListener('DOMContentLoaded', loadAllPartials); 
