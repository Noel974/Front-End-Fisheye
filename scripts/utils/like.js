export class Likes {
    // Constructeur de la classe Likes
    constructor(likes) {
        // Initialise la propriété likes de l'objet Likes avec la valeur passée en paramètre
        this.likes = likes; // Nombre de likes
    }

    // Méthode qui crée et renvoie un élément div du DOM représentant les likes
    getLikesDom() {
        // Crée un élément div
        const div = document.createElement('div');

        // Ajoute la classe CSS 'likeContent' à l'élément div
        div.setAttribute('class', 'likeContent');

        // Définit le contenu HTML de l'élément div en utilisant une expression littérale de gabarit pour insérer la valeur de la propriété likes dans le code HTML
        div.innerHTML = `
            <span class="likes">${this.likes}</span>
            <i 
                class="fa-solid fa-heart icon icon--black" 
                data-fa-transform="up-0.75" 
                aria-label="likes"
            >
            </i>
        `;

        // Renvoie l'élément div créé
        return div;
    }
}

export class LikesManager {
    constructor() {
        // Tableau pour stocker les likes
        this.likesArray = [];
    }

    // Initialise le tableau des likes en se basant sur le tableau des médias
    initializeLikes(mediaArray) {
        this.likesArray = mediaArray.map(media => media.likes);
    }

    // Augmente les likes pour un média spécifique et renvoie le nombre de likes mis à jour
    increaseLikes(mediaId) {
        // Recherche l'index du média dans le tableau des likes
        const mediaIndex = this.likesArray.findIndex((likes, index) => {
            if (this.mediaArray[index].id === mediaId) {
                return true;
            }
        });

        // Si le média est trouvé, augmente les likes et renvoie le nombre mis à jour
        if (mediaIndex !== -1) {
            this.likesArray[mediaIndex]++;
            return this.likesArray[mediaIndex];
        }
// Appelez la méthode augmenterLikes depuis votre instance de PriceAndLikesCard
priceAndLikesCard.augmenterLikes(mediaId);

        // Si le média n'est pas trouvé, renvoie -1 pour indiquer l'échec
        return -1;
    }
}
