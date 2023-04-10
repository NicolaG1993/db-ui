const titleValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/[^a-zA-Z0-9&.,:+_ áéíóúàèìòùÁÉÍÓÚÀÈÌÒÙäöüÄÖÜ'`-]/.test(fieldValue)) {
        return null;
    }
    if (fieldValue.trim().length < 3) {
        return `Il ${fieldName} deve contenere almeno 3 lettere`;
    }
    return "Caratteri non consentiti";
};

const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    } else if (fieldValue.trim().length < 3) {
        return `Il ${fieldName} deve contenere almeno 3 lettere`;
    } else if (
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
            fieldValue
        )
    ) {
        return null;
    } else {
        return "Caratteri non consentiti";
    }
};

const emailValidation = (email) => {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(
            email
        )
    ) {
        return null;
    }
    if (email.trim() === "") {
        return "È richiesta un'email";
    }
    return "Perfavore inserisci un'email valida";
};

const passwordValidation = (password) => {
    if (password.trim().length < 6) {
        return "La password deve contenere almeno 6 caratteri";
    } else {
        return null;
    }
};

const confirmPassword = (password, value) => {
    if (password !== value) {
        return "Le due passwords non corrispondono";
    } else {
        return null;
    }
};

const addressValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim().length < 1) {
        return `L'${fieldName} è richiesto`;
    } else {
        return null;
    }
};

const requestedValue = (fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Devi inserire qualcosa`;
    }
    return null;
};
const textValidation = (fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Devi scriverci qualcosa`;
    }
    return null;
};

const numberValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/^\d+$/.test(fieldValue)) {
        return null;
    }
    return `${fieldName} deve essere un numero`;
};

const decimalValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/^\d*(\.\d{0,2})?$/.test(fieldValue)) {
        return null;
    }
    return `${fieldName} deve essere un numero`;
};

const slugValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Lo ${fieldName} è richiesto`;
    } // 🧨 devo controllare che non ci siano spazi (ancora meglio se li sostituisco con "-")
    return null;
};

//** VALIDATE SHOP ITEMS **//
// l'idea é di avere una max lenght se necessario per design
//ho scoperto che posso gia mettere un limite in input
// ... annulla?

// const ageValidation = (age) => {
//     if (!age) {
//         return "Age is required";
//     }
//     if (age < 18) {
//         return "Age must be at least 18";
//     }
//     if (age > 99) {
//         return "Age must be under 99";
//     }
//     return null;
// };

// const validate = {
//     firstName: (name) => nameValidation("First Name", name),
//     lastName: (name) => nameValidation("Last Name", name),
//     email: emailValidation,
//     age: ageValidation,
// };

module.exports = {
    titleValidation,
    nameValidation,
    emailValidation,
    requestedValue,
    textValidation,
    numberValidation,
    decimalValidation,
    passwordValidation,
    confirmPassword,
    addressValidation,
    slugValidation,
};

/*

1- prendere tutti i valori di form
2- prima di avviare submit il check deve gia essere fatto
3- in caso di errore gli allert vengono mostrati e nessuna richiesta o reload vengono eseguiti, il form resta invariato

2.1- l'oggetto viene inviato in una funzione che gestisce i vari elementi
2.2- ogni valore viene mandato alla validation adeguata (es. nome, number, email) 
2.3- ognuna di queste validation torna il valore, se corretto, oppure un errore + message
2.4- la funzione principale riceve i vari risultati e ricostruisce l'oggetto con i valori (forse non serve visto che vanno giá bene i valori del form stesso)
2.5- costruisce un secondo oggetto con gli errori, se presenti
2.6- in questo caso ritorna al component del form due cose: error = true & errorsObj
2.7- il form se non riceve error = true fa andare next(values), altrimenti no: mostra gli errori ai rispettivi input fields

2.1b.1- potrei evitare la funzione che gestisce l'oggetto, spedendo ogni input alla funzione corrispondente dal component, ricevendo per ognuna l'ok o l'errore
2.1b.2- poi nel component faccio un check degli errori prima di mavviare il submit

*/
