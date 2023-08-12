// Exporte la classe Likes pour qu'elle puisse être utilisée dans d'autres fichiers
export class Likes {
    // Constructeur de la classe Likes
    constructor(likes) {
        // Initialise la propriété likes de l'objet Likes avec la valeur passée en paramètre
        this.likes = likes; // Nombre de likes
    }

    // Méthode qui crée et renvoie un élément div du DOM représentant les likes
    getLikesDom() {
        // Crée un élément div
        const div = document.createElement('div');

        // Ajoute la classe CSS 'likeContent' à l'élément div
        div.setAttribute('class', 'likeContent');

        // Définit le contenu HTML de l'élément div en utilisant une expression littérale de gabarit pour insérer la valeur de la propriété likes dans le code HTML
        div.innerHTML = `
            <span class="likes">${this.likes}</span>
            <i 
                class="fa-solid fa-heart icon icon--black" 
                data-fa-transform="up-0.75" 
                aria-label="likes"
            >
            </i>
        `;

        // Renvoie l'élément div créé
        return div;
    }
}
