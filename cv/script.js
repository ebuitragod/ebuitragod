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
        skills: SIDEBAR_PATH + 'skills.html',
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
        return ''; // Return empty string on error
    }
}

async function loadAllPartials() {
    const container = document.getElementById('cv-container');

    if (!container) {
        console.error('CV container element not found!');
        return;
    }

    try {
        const header = await loadPartial(PATHS.header);
        const mainContent = `
            <div class="main-content">
                ${await loadPartial(PATHS.mainContent.profile)}
                ${await loadPartial(PATHS.mainContent.experience)}
                ${await loadPartial(PATHS.mainContent.projects)}
            </div>
        `;
        const sidebar = `
            <div class="sidebar">
                ${await loadPartial(PATHS.sidebar.skills)}
                ${await loadPartial(PATHS.sidebar.education)}
                ${await loadPartial(PATHS.sidebar.certifications)}
                ${await loadPartial(PATHS.sidebar.languages)}
            </div>
        `;
        const footer = await loadPartial(PATHS.footer);

        container.innerHTML = header + mainContent + sidebar + footer;
    } catch (error) {
        console.error('Error loading CV sections:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadAllPartials); 
