// Exporte la classe Photographer pour qu'elle puisse être utilisée dans d'autres fichiers
export { Photographer }

// Définit la classe Photographer
class Photographer {
    // Constructeur de la classe
    constructor(data) {
        // Initialise les propriétés de l'objet à partir des données fournies
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
    }

    // Accesseurs (getters) pour les propriétés de l'objet
    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return this._portrait
    }
}
