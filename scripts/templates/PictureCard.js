import { Likes, LikesManager } from "../utils/like.js";

// Pour PictureCard
export class PictureCard {
    constructor(picture, photographer) {
        this.id = picture.id;
        this.title = picture.title;
        this.image = picture.image;
        this.likes = picture.likes;
        this.photographerName = photographer.name;
        this.likeButton = null;
        this.likesManager = new LikesManager();

        this.decrementButton = document.createElement('button');
this.decrementButton.setAttribute('class', 'decrement-button');
    }

    // Crée le bouton de like et ajoute un gestionnaire d'événements
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
        // Gestionnaire d'événements pour incrémenter les likes
        this.likeButton.addEventListener('click', () => {
            const mediaId = this.id; // Récupérer l'identifiant du média
            const newLikes = this.likesManager.modifyLikes(mediaId, 'increment'); // Appeler la méthode pour incrémenter les likes
            this.likeButton.querySelector(".likes").textContent = newLikes;
            // Mettre à jour le total des likes
            const like = new Likes();
            this.likesManager.totalSumCalcul();
            like.totalSumCalcul();
        });

        // Gestionnaire d'événements pour décrémenter les likes
        this.decrementButton.addEventListener('click', () => {
            const mediaId = this.id; // Récupérer l'identifiant du média
            const newLikes = this.likesManager.modifyLikes(mediaId, 'decrement'); // Appeler la méthode pour décrémenter les likes

            // Mettre à jour l'affichage des likes
            this.likeButton.querySelector(".likes").textContent = newLikes;

            // Mettre à jour le total des likes
            this.likesManager.totalSumCalcul();
        });


    }

    // Crée et renvoie un élément div du DOM représentant la carte média (image)
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
