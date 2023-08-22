import { Price } from '../utils/price.js';
import { Likes, LikesManager } from '../utils/like.js'; // Importe également LikesManager

export class PriceAndLikesCard {
    constructor(likes, price) {
        this.price = new Price(price);
        this.likesManager = new LikesManager(); // Crée une instance de LikesManager
        this.likes = new Likes(likes);
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
            const contenuLike = this.likes.getLikesDom().querySelector('.likeContent');
            contenuLike.querySelector('.likes').textContent = likesMisAJour;
        }
    }
}
