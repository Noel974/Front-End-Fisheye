import { Price } from '../utils/price.js';
import { Likes } from '../utils/like.js';
import { LikesManager } from '../utils/like.js'; // Assurez-vous que le chemin est correct

export class PriceAndLikesCard {
    constructor(likes, price, mediaArray) {
        // Création d'instances de Price, Likes et LikesManager
        this.price = new Price(price);
        this.likes = new Likes(likes);
        this.likeClicked = false;
        
        // Initialisation du total des likes avec la valeur initiale de likes
        this.totalLikes = this.likes;
        this.updateTotalLikesContent(); // Mettre à jour l'affichage du total des likes dans le DOM

        // Création d'une instance de LikesManager pour gérer les likes
        this.likesManager = new LikesManager();
        this.likesManager.initializeLikes(mediaArray);

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
        this.likes.updateLikesCount(this.likes.likes);

        // Ajouter les éléments DOM pour les likes et le prix à la div
        div.appendChild(this.likes.getLikesDom());
        div.appendChild(this.price.getPriceDom());

        return div;
    }

    // Mettre à jour le total des likes en fonction des likes actuels des médias
    updateTotalLikes() {
        this.totalLikes = this.likesManager.calculateTotalLikes();
    }

    // Gérer l'augmentation et la diminution des likes
    handleLike(mediaId) {
        const updatedLikes = this.likeClicked
            this.likesManager.decrementLikes(mediaId)
            this.likesManager.incrementLikes(mediaId);
    
        if (updatedLikes !== -1) {
            this.likes.likes = updatedLikes; // Mettre à jour les likes dans l'instance de Likes
            this.likes.updateDomContent(); // Mettre à jour l'affichage des likes dans le DOM
            this.likeClicked = !this.likeClicked;
            this.updateTotalLikes(); // Mettre à jour le total des likes
            this.updateTotalLikesContent(); // Mettre à jour le contenu du total des likes dans le DOM
        }
    }

    // Mettre à jour le contenu du total des likes dans le DOM
    updateTotalLikesContent() {
        const totalLikesElement = this.likes.getLikesDom().querySelector('.likes');
        
        if (totalLikesElement) {
            totalLikesElement.textContent = `Total des likes : ${this.totalLikes}`;
        }
    }
}
