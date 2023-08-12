// Importe la classe Media depuis le fichier Media.js
import { Media } from './Media.js'

// Exporte la classe Picture pour qu'elle puisse être utilisée dans d'autres fichiers
export { Picture }

// Définit la classe Picture qui hérite de la classe Media
class Picture extends Media {
    // Constructeur de la classe Picture
    constructor(data) {
        // Appelle le constructeur de la classe parente Media avec l'objet data
        super(data)
        // Initialise la propriété image de l'objet Picture avec la valeur de la propriété image de l'objet data
        this.image = data.image // Chemin vers l'image
    }
}
