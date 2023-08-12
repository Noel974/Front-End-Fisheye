import { Price } from '..utils/price.js';
import { Likes } from '../utils/like.js';

// Exporte la classe PriceAndLikesCard pour qu'elle puisse être utilisée dans d'autres fichiers
export class PriceAndLikesCard {
    // Constructeur de la classe PriceAndLikesCard
    constructor(likes, price) {
        this.price = new Price(price);
        this.likes = new Likes(likes);
    }

    // Méthode qui crée et renvoie un élément div du DOM représentant la carte de prix et de likes
    getPriceAndLikesDom() {
        // Crée un élément div
        const div = document.createElement('div');

        // Ajoute la classe CSS 'priceAndLikes' à l'élément div
        div.setAttribute('class', 'priceAndLikes');

        // Ajoute les éléments du DOM représentant les likes et le prix à l'élément div
        div.appendChild(this.likes.getLikesDom());
        div.appendChild(this.price.getPriceDom());

        // Renvoie l'élément div créé
        return div;
    }
}
