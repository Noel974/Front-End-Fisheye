// Importez les classes de like.js
import { Likes, LikesManager } from '../utils/like.js'; 

import { Price } from '../utils/price.js'; 

export class PriceAndLikesCard {
    constructor(likes, price, mediaArray) {
        // Création d'une instance de LikesManager pour gérer les likes en premier
        this.likesManager = new LikesManager();
        this.likesManager.initializeLikes(mediaArray);

        // Création d'instances de Price et Likes
        this.price = new Price(price);
        this.likes = new Likes(likes);
        this.likeClicked = false;
        
        // Initialisation du total des likes avec la valeur initiale de likes
        this.totalLikes = this.likesManager.calculateTotalLikes();

        // Associer un gestionnaire d'événements au clic sur le bouton de like
        this.likes.getLikesDom().querySelector('.fa-heart').addEventListener('click', () => {
            this.handleLike(mediaArray[0].id); // Remplacez par l'ID du média approprié
        });
    }

    // Crée et renvoie un élément div du DOM représentant la carte de prix et de likes
    getPriceAndLikesDom() {
        const div = document.createElement('div');
        div.setAttribute('class', 'priceAndLikes');

        // Mettre à jour le nombre de likes affiché en fonction du total des likes
        this.likes.updateTotalLikesContent(this.totalLikes);

        // Ajouter les éléments DOM pour les likes et le prix à la div
        div.appendChild(this.likes.getLikesDom()); console.log(this.likes)
        div.appendChild(this.price.getPriceDom());

        return div;
    }

    // Gérer l'augmentation et la diminution des likes
    handleLike(mediaId) {
        const updatedLikes = this.likeClicked ? this.totalLikes - 1 : this.totalLikes + 1;

        if (updatedLikes >= 0) {
            this.likesManager.decrementLikes(mediaId);
            this.likesManager.incrementLikes(mediaId);
            
            this.totalLikes = updatedLikes; // Mettre à jour le total des likes
            this.updateTotalLikesContent(); // Mettre à jour le contenu du total des likes dans le DOM
            this.likeClicked = !this.likeClicked;
        }
    }

    // Mettre à jour le contenu du total des likes dans le DOM
    updateTotalLikesContent() {
        const totalLikesElement = document.querySelector('#main > div.priceAndLikes > div > span');
        
        if (totalLikesElement) {
            totalLikesElement.textContent = `${this.totalLikes}`;
        }
    }
}
