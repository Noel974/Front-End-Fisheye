import { Likes, LikesManager } from "../utils/like.js";

import medias from '../../data/photographers.json' assert {type : 'json'};

export class VideoCard {
    constructor(video, photographer) {
        // Initialisation des propriétés de la vidéo
        this.id = video.id;
        this.title = video.title;
        this.video = video.video;
        this.likes = video.likes;
        this.photographerName = photographer.name;
        this.likeButton = null;
        this.likesManager = new LikesManager();
        this.likesManager.initializeLikes(medias.media)

    }

    // Méthode pour créer le bouton de like
    createLikeButton() {
        this.likeButton = document.createElement('button');
        this.likeButton.setAttribute('class', 'like-button');
        this.likeButton.innerHTML = `
            <div class="subContent">
                <span class="likes">${this.likes}</span>
                <button class="like-button">
                    <i class="fa-solid fa-heart icon" data-fa-transform="up-1"></i>
                </button>
            </div>
        `;
        // Gestionnaire d'événements pour incrémenter les likes
        this.likeButton.addEventListener('click', () => {
            const mediaId = this.id; // Récupérer l'identifiant du média
            const currentLikes = parseInt(this.likeButton.querySelector(".likes").textContent); // Obtenir le nombre actuel de likes
            // console.log(medias.media.find(x=> x.id == mediaId))
            console.log('currentLike',currentLikes)
            console.log('histoLike',medias.media.find(x=> x.id == mediaId).likes)
            if (currentLikes > medias.media.find(x=> x.id == mediaId).likes) {
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


    // Méthode pour obtenir l'élément DOM de la carte vidéo
    getVideoCardDom() {
        this.createLikeButton(); // Crée le bouton de like

        const mediaItem = document.createElement('div');
        const videoName = this.video.replace('.mp4', '').replaceAll('_', ' ');

        mediaItem.setAttribute('class', 'media__item');

        // Crée l'élément DOM de la vidéo
        mediaItem.innerHTML = `
            <a href="../assets/media/${this.photographerName}/${this.video}" alt="${this.title}">
                <video controls>
                    <source src="../assets/media/${this.photographerName}/${this.video}" type="video/mp4">
                    Votre navigateur ne prend pas en charge la vidéo.
                </video>
                <div class="content">
                    <span class="title">${this.title}</span>
                </div>
            </a>
        `;

        const subContent = document.createElement('div');
        subContent.setAttribute('class', 'subContent');
        subContent.appendChild(this.likeButton); // Ajoute le bouton de like au sous-contenu

        mediaItem.appendChild(subContent); // Ajoute le sous-contenu à l'élément média

        return mediaItem; // Renvoie l'élément complet de la carte vidéo
    }
}
