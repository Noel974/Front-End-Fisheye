// Exporte la classe Price pour qu'elle puisse être utilisée dans d'autres fichiers
export class Price {
    // Constructeur de la classe Price
    constructor(price) {
        // Initialise la propriété price de l'objet Price avec la valeur passée en paramètre
        this.price = price; // Prix
    }

    // Méthode qui crée et renvoie un élément span du DOM représentant le prix
    getPriceDom() {
        // Crée un élément span
        const span = document.createElement('span');

        // Ajoute la classe CSS 'price' à l'élément span
        span.setAttribute('class', 'price');

        // Définit le contenu HTML de l'élément span en utilisant une expression littérale de gabarit pour insérer la valeur de la propriété price dans le code HTML
        span.innerHTML = `${this.price}€ / jour`;

        // Renvoie l'élément span créé
        return span;
    }
}
