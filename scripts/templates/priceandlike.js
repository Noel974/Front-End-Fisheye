import { Price } from '../utils/price.js';
import { Likes, LikesManager } from '../utils/like.js'; // Importe également LikesManager

export class PriceAndLikesCard {
    constructor(likes, price) {
        this.price = new Price(price);
        this.likesManager = new LikesManager(); // Crée une instance de LikesManager
        this.likes = new Likes(likes);
        this.totalLikes = 0; // Initialisez le total des likes à zéro
    }

    // Renvoie un élément div du DOM représentant la carte de prix et de likes
    getPriceAndLikesDom() {
        const div = document.createElement('div');
        div.setAttribute('class', 'priceAndLikes');

        div.appendChild(this.likes.getLikesDom());
        div.appendChild(this.price.getPriceDom());

        return div;
    }

    // Utilisez cette méthode pour augmenter les likes en utilisant LikesManager
    augmenterLikes(mediaId) {
        const likesMisAJour = this.likesManager.augmenterLikes(mediaId);
        if (likesMisAJour !== -1) {
            this.totalLikes++; // Incrémente le total des likes
            const contenuLike = this.likes.getLikesDom().querySelector('.likeContent');
            contenuLike.querySelector('.likes').textContent = likesMisAJour;
    
            // Met à jour l'affichage du total des likes
            const totalLikesElement = document.querySelector('.total-likes');
            if (totalLikesElement) {
                totalLikesElement.textContent = `Total des likes : ${this.totalLikes}`;
            }
        }
    }

    // Méthode pour afficher le total des likes
    displayTotalLikes() {
        const totalLikesElement = document.createElement('div');
        totalLikesElement.setAttribute('class', 'total-likes');
        totalLikesElement.textContent = `Total des likes : ${this.totalLikes}`;
        return totalLikesElement;
    }
}