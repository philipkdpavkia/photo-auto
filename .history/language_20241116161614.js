// Gestione della lingua
let currentLang = localStorage.getItem('lang') || 'it';
const translations = {}; // Qui importeremo il JSON delle traduzioni

async function loadTranslations() {
    try {
        // Assicurati che il percorso sia corretto
        const response = await fetch('/translations.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        Object.assign(translations, data);
        updateContent();
    } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback in caso di errore
        document.getElementById('langSwitch').style.display = 'none';
    }
}

function switchLanguage() {
    // Aggiungi un console.log per debug
    console.log('Switching language from', currentLang);
    currentLang = currentLang === 'it' ? 'en' : 'it';
    console.log('to', currentLang);
    
    localStorage.setItem('lang', currentLang);
    updateContent();
    updateLangButton();
}

function updateLangButton() {
    const button = document.getElementById('langSwitch');
    if (button) {
        button.textContent = currentLang === 'it' ? 'EN' : 'IT';
        // Aggiungi un console.log per debug
        console.log('Button updated to:', button.textContent);
    }
}

function updateContent() {
    // Verifica che translations sia caricato
    if (Object.keys(translations).length === 0) {
        console.warn('Translations not loaded yet');
        return;
    }

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let value = translations[currentLang];
        
        // Verifica che il valore esista
        if (!value) {
            console.warn(`Translation missing for language: ${currentLang}`);
            return;
        }

        try {
            keys.forEach(k => {
                value = value[k];
            });
            if (value) element.textContent = value;
        } catch (error) {
            console.warn(`Translation key not found: ${key}`);
        }
    });
}

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    updateLangButton();
});

// Aggiungi l'event listener al bottone
document.getElementById('langSwitch').addEventListener('click', switchLanguage);