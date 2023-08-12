// Exporte la classe Media pour qu'elle puisse être utilisée dans d'autres fichiers
export { Media }

// Définit la classe Media
class Media {
    // Constructeur de la classe Media
    constructor(data) {
        // Initialise les propriétés de l'objet Media avec les valeurs de l'objet data
        this.id = data.id // Identifiant unique du média
        this.photographerId = data.photographerId // Identifiant du photographe associé au média
        this.title = data.title // Titre du média
        this.likes = data.likes // Nombre de likes du média
        this.date = data.date // Date de publication du média
        this.price = data.price // Prix du média
    }
}
