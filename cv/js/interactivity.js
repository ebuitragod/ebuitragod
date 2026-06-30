// cv/js/interactivity.js
export function initializeInteractivity() {
  // Botón de imprimir
  const printButton = document.getElementById('print-btn');
  if (printButton) {
    printButton.addEventListener('click', () => window.print());
  }

  document.querySelectorAll("a[href^='http']").forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  console.log('CV loaded successfully!');
  console.log('\
        This CV was built with HTML/CSS/JS and is optimized for \
        both web and print, preferably viewed in Chrome or Edge for best \
        results. For any inquiries, please contact me at ebuitragod@gmail.com\
        ');
}
