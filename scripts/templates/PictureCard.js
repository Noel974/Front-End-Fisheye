// Importation des classes Likes et LikesManager depuis un fichier "like.js"
import { Likes, LikesManager } from "../utils/like.js";

// Importation des données des médias depuis le fichier JSON des photographes
import medias from '../../data/photographers.json' assert { type: 'json' };

// Définition de la classe PictureCard
export class PictureCard {
    constructor(picture, photographer) {
        // Initialisation des propriétés de la carte média (image)
        this.id = picture.id;
        this.title = picture.title;
        this.image = picture.image;
        this.likes = picture.likes;
        this.photographerName = photographer.name;
        this.likeButton = null;
        this.likesManager = new LikesManager();
        
        // Initialisation du gestionnaire de likes avec les données des médias
        this.likesManager.initializeLikes(medias.media)
    }

    // Méthode pour créer le bouton de like et ajouter un gestionnaire d'événements
    createLikeButton() {
        this.likeButton = document.createElement('button');
        this.likeButton.setAttribute('class', 'like-button');
        this.likeButton.innerHTML = `
            <div class="subContent active">
                <span class="likes">${this.likes}</span>
                <button class="like-button">
                    <i class="fa-solid fa-heart icon" data-fa-transform="up-1"></i>
                </button>
            </div>
        `;

        // Gestionnaire d'événements lorsque le bouton de like est cliqué
        this.likeButton.addEventListener('click', () => {
            const mediaId = this.id; // Récupérer l'identifiant du média
            const currentLikes = parseInt(this.likeButton.querySelector(".likes").textContent); // Obtenir le nombre actuel de likes
            
            if (currentLikes > medias.media.find(x => x.id == mediaId).likes) {
                // Si des likes sont déjà présents, décrémentez-les
                const newLikes = this.likesManager.modifyLikes(mediaId, 'decrement');
                this.likeButton.querySelector(".likes").textContent = newLikes;
            } else {
                // Sinon, incrémente les likes
                const newLikes = this.likesManager.modifyLikes(mediaId, 'increment');
                this.likeButton.querySelector(".likes").textContent = newLikes;
            }
        
            // Mettre à jour le total des likes de tous les médias
            const like = new Likes();
            like.totalSumCalcul();
        });
    }

    // Méthode pour créer et renvoyer un élément div du DOM représentant la carte média (image)
    getPictureCardDom() {
        this.createLikeButton();

        const mediaItem = document.createElement('div');
        const imageName = this.image.replace('.jpg', '').replaceAll('_', ' ');

        mediaItem.setAttribute('class', 'media__item');

        mediaItem.innerHTML = `
            <a href="../assets/media/${this.photographerName}/${this.image}" alt="${this.title}">
                <img src="assets/media/${this.photographerName}/${this.image}" alt="${imageName}, closeup view">
                <div class="content">
                    <span class="title">${this.title}</span>
                </div>
            </a>
        `;

        const subContent = document.createElement('div');
        subContent.setAttribute('class', 'subContent');
        subContent.appendChild(this.likeButton);
        
        mediaItem.appendChild(subContent);

        return mediaItem;
    }
}
