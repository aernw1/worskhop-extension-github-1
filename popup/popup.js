document.getElementById('save').addEventListener('click', () => {
    const iconSet = document.getElementById('icon-set').value;
    chrome.storage.sync.set({ iconSet }, () => {
      alert('Préférences enregistrées !');
    });
  });
  
  // Charger la préférence actuelle
  chrome.storage.sync.get('iconSet', (data) => {
    if (data.iconSet) {
      document.getElementById('icon-set').value = data.iconSet;
    }
  });