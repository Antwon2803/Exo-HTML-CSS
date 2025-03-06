fetch('https://valorant-api.com/v1/weapons/skins')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    let skins = data.data; // Accéder au tableau des skins

    if (skins.length < 6) {
        console.error("Pas assez de skins disponibles !");
        return;
    }

    let infos = { names: [], images: [] };

    // 🎲 Tirage aléatoire de 6 skins différents
    let randomIndexes = new Set();
    while (randomIndexes.size < 6) {
        let randomIndex = Math.floor(Math.random() * skins.length);
        randomIndexes.add(randomIndex);
    }

    randomIndexes.forEach(index => {
        infos.images.push(skins[index].displayIcon); // Récupère l'icône de chaque skin
        infos.names.push(skins[index].displayName);
    });

    const cards = document.querySelectorAll(".card"); // Sélectionne toutes les cartes

    cards.forEach((card, index) => {
        if (infos.images[index]) {
            card.innerHTML = `
                <img src="${infos.images[index]}" alt="${infos.names[index]}">
                <h2>${infos.names[index]}</h2>
                <button class="add-to-cart" onclick="addToCart('${infos.names[index]}', '${infos.images[index]}')">
                    Ajouter au panier
                </button>
            `;
        }
    });
    
    
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
  });
