// Element du DOM
const modal = document.getElementById('contact_modal')
const btnOpenModal = document.getElementById('btn_openContact')
const btnCloseModal = document.getElementById('btn_closeContact')
const form = document.forms.contactForm
const formData = document.querySelectorAll('.formData')

// Ouvre le formulaire de contact
btnOpenModal.addEventListener('click', displayModal)

function displayModal() {
    modal.style.display = 'block'

    // Activer le no-scroll sur le body
    document.body.setAttribute('class', 'no-scroll')
}

// Ancien code pour fermer le modal en cliquant sur le bouton
btnCloseModal.addEventListener('click', closeModal);

// Fonction pour fermer le formulaire de contact
function closeModal() {
    modal.style.display = 'none';

    // Désactiver le no-scroll sur le body en supprimant .no-scroll
    document.body.removeAttribute('class');
}

// Fonction pour gérer la navigation avec les touches fléchées
function handleArrowKeys(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowUp') {
            // Code pour aller à l'élément précédent (si applicable)
            // Par exemple, sélectionnez l'élément précédent dans une liste d'éléments
            // Assurez-vous que le focus est sur l'élément souhaité
        } else if (event.key === 'ArrowDown') {
            // Code pour aller à l'élément suivant (si applicable)
            // Par exemple, sélectionnez l'élément suivant dans une liste d'éléments
            // Assurez-vous que le focus est sur l'élément souhaité
        }
    }
}

// Écoutez les événements de touche pour la navigation avec les touches fléchées
document.addEventListener('keydown', handleArrowKeys);

// Nouveau code pour fermer le modal avec la touche "Échap"
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

form.addEventListener('submit', validateForm)

function validateForm(e) {
    e.preventDefault()

    let isValid = true

    if (!validateFirstName()) {
        formData[0].dataset.errorVisible = 'true'
        isValid = false
    } else {
        formData[0].dataset.errorVisible = 'false'
    }

    if (!validateLastName()) {
        formData[1].dataset.errorVisible = 'true'
        isValid = false
    } else {
        formData[1].dataset.errorVisible = 'false'
    }

    if (!validateEmail()) {
        formData[2].dataset.errorVisible = 'true'
        isValid = false
    } else {
        formData[2].dataset.errorVisible = 'false'
    }

    if (!validateMessage()) {
        formData[3].dataset.errorVisible = 'true'
        isValid = false
    } else {
        formData[3].dataset.errorVisible = 'false'
    }

    if (isValid) {
        // Fermer le formulaire
        closeModal()

        // Réinitialiser le formulaire
        form.reset()
    }
}

// Valide le prénom
function validateFirstName() {
    return !(form.firstName.value === '' || form.firstName.value.length < 2)
}

// Valide le nom
function validateLastName() {
    return !(form.lastName.value === '' || form.lastName.value.length < 2)
}

// Valide le l;email
function validateEmail() {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    return regexEmail.test(form.email.value) // test l'email
}

// Valide le message
function validateMessage() {
    return !(form.message.value === '' || form.message.value.length < 5)
}