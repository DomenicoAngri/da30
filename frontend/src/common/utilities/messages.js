export default function getMessage(messageCode){
    switch(messageCode){
        /* ********************
         * Warn messages
         * ******************** */
        case 'WARN_020':
            return 'Username inesistente!';

        case 'WARN_022':
            return 'L\'username inserito è già utilizzato!';

        /* ********************
         * Error messages
         * ******************** */
        case 'ERR_020':
            return 'L\'username è arrivato nullo o vuoto al server, riprova! Codice errore: ERR_020';

        case 'ERR_022':
            return 'La password è arrivata nulla o vuota al server, riprova! Codice errore: ERR_022';

        case 'ERR_036':
            return 'La password non è corretta, ricontrolla!';

        /* ********************
         * Fatal messages
         * ******************** */
        case 'FAT_000':
            return 'Il server sembra non rispondere. Riprova fra poco. Codice errore: FAT_000.';
        
        case 'FAT_021':
            return 'Errore fatale accaduto durante la registrazione dell\'utente. Codice errore: FAT_021.';
        
        case 'FAT_025':
            return 'Errore fatale accaduto durante il controllo dell\'esistenza dell\'username. Codice errore: FAT_025.';

        /* ********************
         * Default message
         * ******************** */
        default:
            return 'Ad essere sincero... Non so che errore sia mai potuto capitare, probabilmente il server a breve scoppierà. Prova a contattare Gandalf il Bianco. Fuggite.. Sciocchi! Codice errore: EVIL_666.';
    }
}