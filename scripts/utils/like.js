export class Likes {
    constructor(likes) {
        this.likes = likes;
        this.totalLikes = likes; // Ajoutez une propriété pour le total des likes
    }

    // Crée et renvoie un élément div du DOM représentant les likes
    getLikesDom() {
        const div = document.createElement('div');
        div.classList.add('likeContent');

        div.innerHTML = `
            <span class="like">${this.likes}</span>
            <i class="fa-solid fa-heart icon icon--black" data-fa-transform="up-0.75" aria-label="likes"></i>
        `;

        return div;
    }

    // Incrémente ou décrémente le nombre de likes en fonction de l'opération donnée
    updateLikes(operation) {
        if (operation === 'increase') {
            this.likes++;
        } else if (operation === 'decrease' && this.likes > 0) {
            this.likes--;
        }
    }

    // Méthode pour calculer la somme totale des likes
    calculateTotalLikes() {
        return this.likes;
    }
    totalSumCalcul() {
        const like = document.getElementsByClassName("likes");
        const likeSum = document.getElementsByClassName("like");
        let sum = 0;
        Array.from(like).forEach((element) => {
            sum += parseInt(element.textContent);
        });
        likeSum[0].innerHTML = sum;
    }

    // Mettre à jour le total des likes dans le DOM
    updateTotalLikesContent(updatedLikes) {
        const likesElement = this.getLikesDom();
        likesElement.querySelector(`.like`).textContent = updatedLikes;
    }
}


// Classe LikesManager pour gérer les likes globaux
export class LikesManager {
    constructor() {
        this.mediaArray = []; // Assurez-vous d'initialiser mediaArray
        this.likes = new Likes(0); // Initialisation de l'instance Likes pour gérer les likes globaux
    }

    // Initialise le tableau des likes en se basant sur le tableau des médias
    initializeLikes(mediaArray) {
        if (Array.isArray(mediaArray) && mediaArray.length > 0) {
            this.mediaArray = mediaArray;
        } else {
            // Gérer le cas où mediaArray est vide ou indéfini
            this.mediaArray = [];
        }
    }
    getLikes(mediaId) {
        const media = this.mediaArray.find(media => media.id === mediaId);

        if (media) {
            return media.likes.likes;
        }

        return 0; // Retourne 0 si le média n'est pas trouvé ou s'il n'a pas de likes
    }

    modifyLikes(mediaId, action) {
        this.media = this.mediaArray.find(media => media.id === mediaId);
        console.log('nb de likes ',action)
        let mediaCurrent = {... this.media};
        if (this.media) {
            if (action === 'increment') {
                console.log('old like',this.media.likes)
                mediaCurrent.likes = parseInt(this.media.likes)+1;
                console.log('new like',this.media.likes)
            } else if (action === 'decrement' && this.likes > 0) {
                mediaCurrent.likes = parseInt(this.media.likes)-1;
            }         

            // Calculez le total des likes après l'incrémentation ou la décrémentation
        const totalLikes = this.calculateTotalLikes();
        return mediaCurrent.likes;
        }

        return 0; // Retourne -1 si le média n'est pas trouvé
    }
    // Met à jour le total des likes dans le DOM
    updateTotalLikesInDom() {
        this.likes.updateTotalLikesContent(this.mediaArray);
    }


    // Fonction pour calculer la somme totale des likes pour tous les médias
    totalSumCalcul() {
        const totalLikes = this.calculateTotalLikes();
        this.likes.updateTotalLikesContent(totalLikes);
    }

    // Calcule la somme totale des likes pour tous les médias
    calculateTotalLikes() {
        const likes = this.mediaArray.reduce((total, media) => total + media.likes.likes, 0);
        return likes;
    }
}
