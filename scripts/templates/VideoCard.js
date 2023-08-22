export { VideoCard }
class VideoCard {
    constructor(video, photographer) {
        this.id = video.id
        this.title = video.title
        this.video = video.video
        this.likes = video.likes
        this.date = video.date
        this.price = video.price
        this.photographerId = video.photographerId
        this.photographerName = photographer.name
    }

    getVideoCardDom() {
        const mediaItem = document.createElement('div');
        const videoName = this.video.replace('.mp4', '').replaceAll('_', ' ');
    
        mediaItem.setAttribute('class', 'media__item');
    
        const likeButton = document.createElement('button');
        likeButton.setAttribute('class', 'like-button');
        likeButton.innerHTML = `
            <div class="subContent">
                <span class="likes">${this.likes}</span>
                <button class="like-button">
                    <i class="fa-solid fa-heart icon" data-fa-transform="up-1"></i>
                </button>
            </div>
        `;
    
        likeButton.addEventListener('click', () => {
            this.likes++; // Augmenter le compteur de likes
            likeButton.querySelector('.likes').textContent = this.likes; // Mettre à jour l'affichage des likes
        });
    
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
        subContent.appendChild(likeButton);
    
        mediaItem.appendChild(subContent);
    
        return mediaItem;
    }
}    