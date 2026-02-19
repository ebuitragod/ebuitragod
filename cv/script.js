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
        return ''; 
    }
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

        const [mainContent, sidebar] = await Promise.all([
            loadSection(PATHS.mainContent),
            loadSection(PATHS.sidebar)
        ]);

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

document.addEventListener('DOMContentLoaded', loadAllPartials); 
