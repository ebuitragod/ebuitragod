// cv/js/constants.js
const PATHS = {
  based: "cv/sections/",
  mainContent: "cv/sections/main-content/",
  sidebar: "cv/sections/sidebar/",
  data: "/data/",
};

PATHS.header = PATHS.based + "header.html";
PATHS.footer = PATHS.based + "footer.html";
PATHS.main = {
  profile: PATHS.mainContent + "profile.html",
  experience: PATHS.mainContent + "experience.html",
  projects: PATHS.mainContent + "projects.html",
};
PATHS.sidebarStatic = {
  education: PATHS.sidebar + "education.html",
  certifications: PATHS.sidebar + "certifications.html",
  languages: PATHS.sidebar + "languages.html",
};

export { PATHS };
