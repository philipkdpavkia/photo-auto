// Gestione della lingua
let currentLang = localStorage.getItem('lang') || 'it';
const translations = {}; // Qui importeremo il JSON delle traduzioni

async function loadTranslations() {
    try {
        const response = await fetch('/translations.json');
        Object.assign(translations, await response.json());
        updateContent();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function switchLanguage() {
    currentLang = currentLang === 'it' ? 'en' : 'it';
    localStorage.setItem('lang', currentLang);
    updateContent();
    updateLangButton();
}

function updateLangButton() {
    const button = document.getElementById('langSwitch');
    button.textContent = currentLang === 'it' ? 'EN' : 'IT';
}

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.dataset.i18n;
        const keys = key.split('.');
        let value = translations[currentLang];
        keys.forEach(k => {
            value = value[k];
        });
        if (value) element.textContent = value;
    });
}

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    updateLangButton();
});