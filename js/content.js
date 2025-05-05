// Mapping des extensions de fichiers aux icônes
const fileIcons = {
    '.js': '/icons/js.svg',
    '.py': '/icons/py.svg',
    '.md': '/icons/md.svg',
    '.css': '/icons/css.svg',
    '.java': '/icons/java.svg',
    '.html': '/icons/html.svg',
    // Ajouter d'autres extensions ici
  };
  
  // Fonction pour ajouter des icônes
  function addFileIcons() {
    // Sélectionner tous les éléments de fichiers dans l’explorateur GitHub
    const fileRows = document.querySelectorAll('a.js-navigation-open');
    
    fileRows.forEach(file => {
      // Extraire l’extension du fichier
      const fileName = file.textContent.trim();
      const extension = fileName.match(/\.[0-9a-z]+$/i)?.[0]?.toLowerCase();
      
      if (extension && fileIcons[extension]) {
        // Vérifier si l’icône n’a pas déjà été ajoutée
        if (!file.querySelector('.file-icon')) {
          const icon = document.createElement('img');
          icon.src = chrome.runtime.getURL(fileIcons[extension]);
          icon.className = 'file-icon';
          icon.style.width = '16px';
          icon.style.marginRight = '5px';
          icon.style.verticalAlign = 'middle';
          file.prepend(icon);
        }
      }
    });
  }
  
  // Exécuter la fonction au chargement initial
  addFileIcons();
  
  // Observer les changements dans l’interface (GitHub est une SPA)
  const observer = new MutationObserver(addFileIcons);
  observer.observe(document.body, { childList: true, subtree: true });