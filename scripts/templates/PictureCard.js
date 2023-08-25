// Pour PictureCard
export class PictureCard {
    constructor(picture, photographer) {
        this.id = picture.id;
        this.title = picture.title;
        this.image = picture.image;
        this.likes = picture.likes;
        this.photographerName = photographer.name;
        this.likeButton = null;
    }

    // Crée le bouton de like et ajoute un gestionnaire d'événements
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
        this.likeButton.addEventListener('click', () => {
            this.likes++;
            this.likeButton.querySelector('.likes').textContent = this.likes;
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
