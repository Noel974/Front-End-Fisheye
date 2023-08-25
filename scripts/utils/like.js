// Classe Likes pour gérer les likes individuels
export class Likes {
    constructor(likes) {
        this.likes = likes;
    }

    // Crée et renvoie un élément div du DOM représentant les likes
    getLikesDom() {
        const div = document.createElement('div');
        div.classList.add('likeContent');
        
        div.innerHTML = `
            <span class="likes">${this.likes}</span>
            <i class="fa-solid fa-heart icon icon--black" data-fa-transform="up-0.75" aria-label="likes"></i>
        `;
        
        return div;
    }

    // Incrémente le nombre de likes
    increaseLikes() {
        this.likes++;
    }

    // Décrémente le nombre de likes, si possible
    decreaseLikes() {
        if (this.likes > 0) {
            this.likes--;
        }
    }

    // Met à jour le nombre de likes affiché
    updateLikesCount(updatedLikes) {
        const likesElement = this.getLikesDom();
        likesElement.querySelector('.likes').textContent = updatedLikes;
    }

    // Met à jour le contenu DOM avec le nombre de likes actuel
    updateDomContent() {
        const likesElement = document.querySelector('.likes');
        if (likesElement) {
            likesElement.textContent = this.likes;
        }
    }
}

// Classe LikesManager pour gérer les likes globaux
export class LikesManager {
    constructor() {
        this.mediaArray = []; // Assurez-vous d'initialiser mediaArray
    }

    // Initialise le tableau des likes en se basant sur le tableau des médias
    initializeLikes(mediaArray) {
        this.mediaArray = mediaArray;
    }

    // Incrémente les likes pour un média donné
    incrementLikes(mediaId) {
        const media = this.mediaArray.find(media => media.id === mediaId);

        if (media) {
            media.likes.increaseLikes();
            return media.likes.likes;
        }
        return -1;
    }

    // Décrémente les likes pour un média donné
    decrementLikes(mediaId) {
        const media = this.mediaArray.find(media => media.id === mediaId);

        if (media) {
            media.likes.decreaseLikes();
            return media.likes.likes;
        }
        return -1;
    }

    // Calcule la somme totale des likes pour tous les médias
    calculateTotalLikes() {
        const totalLikes = this.mediaArray.reduce((total, media) => total + media.likes.likes, 0);
        return totalLikes;
    }
}
