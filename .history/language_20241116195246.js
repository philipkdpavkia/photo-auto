// Stato corrente della lingua
let currentLang = 'en';
let translations = null;

// Carica le traduzioni dal file JSON
async function loadTranslations() {
    try {
        const response = await fetch('/translations.json');
        translations = await response.json();
        // Inizializza la lingua
        updateAllContent();
    } catch (error) {
        console.error('Errore nel caricamento delle traduzioni:', error);
    }
}

// Funzione principale per il cambio lingua
function switchLanguage() {
    if (!translations) return; // Non fare nulla se le traduzioni non sono ancora caricate
    
    // Cambia la lingua
    currentLang = currentLang === 'en' ? 'it' : 'en';
    
    // Aggiorna il testo del bottone
    const langSwitch = document.getElementById('langSwitch');
    langSwitch.textContent = currentLang === 'en' ? 'IT' : 'EN';

    // Aggiorna tutti i contenuti
    updateAllContent();
    
    // Salva la preferenza
    localStorage.setItem('preferredLanguage', currentLang);
}

// Funzione che aggiorna tutti i contenuti
function updateAllContent() {
    if (!translations) return;
    
    updateMenuItems();
    updateHeroSection();
    updateAboutSection();
    updateContactSection();
    updatePhilosophySection();
}

// Aggiorna gli elementi del menu
function updateMenuItems() {
    const menuTranslations = translations[currentLang].menu;
    
    document.querySelectorAll('.nav-links a').forEach(item => {
        const href = item.getAttribute('href');
        if (href === '#gallery') item.textContent = menuTranslations.gallery;
        if (href === '#about') item.textContent = menuTranslations.about;
        if (href === '#contact') item.textContent = menuTranslations.contact;
    });
}

// Aggiorna la sezione hero
function updateHeroSection() {
    const heroTranslations = translations[currentLang].hero;
    
    updateWorkshopText('/workshop/cuba.html', heroTranslations.havana);
    updateWorkshopText('/workshop/senegal.html', heroTranslations.senegal);
    updateWorkshopText('/workshop/mexico.html', heroTranslations.mexico);
}

// Funzione helper per aggiornare il testo dei workshop
function updateWorkshopText(href, translations) {
    const workshopElement = document.querySelector(`a[href="${href}"] .workshop-text`);
    if (workshopElement) {
        const titleElement = workshopElement.querySelector('h2');
        const subtitleElement = workshopElement.querySelector('p');
        
        if (titleElement) titleElement.textContent = translations.title;
        if (subtitleElement) subtitleElement.textContent = translations.subtitle;
    }
}

// Aggiorna la sezione about
function updateAboutSection() {
    const blogTranslations = translations[currentLang].blog;
    
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) sectionTitle.textContent = blogTranslations.title;
    
    const paragraphs = document.querySelectorAll('.about p');
    if (paragraphs.length >= 3) {
        paragraphs[0].textContent = blogTranslations.text1;
        paragraphs[1].textContent = blogTranslations.text2;
        paragraphs[2].textContent = blogTranslations.text3;
    }

    const aboutTitle = document.querySelector('.about h2');
    if (aboutTitle) aboutTitle.textContent = blogTranslations.description;
}

// Aggiorna la sezione filosofia
function updatePhilosophySection() {
    const philosophyTranslations = translations[currentLang].philosophy;
    
    const title = document.querySelector('.philosophy h3');
    if (title) title.textContent = philosophyTranslations.title;
    
    const points = document.querySelectorAll('.philosophy ul li');
    points.forEach((point, index) => {
        if (philosophyTranslations.points[index]) {
            point.textContent = philosophyTranslations.points[index];
        }
    });
}

// Aggiorna la sezione contatti
function updateContactSection() {
    const contactTranslations = translations[currentLang].contact;
    
    const mainTitle = document.querySelector('.contact h2');
    if (mainTitle) mainTitle.textContent = contactTranslations.title;
    
    const sections = document.querySelectorAll('.contact-section');
    sections.forEach(section => {
        const title = section.querySelector('h3');
        const text = section.querySelector('p');
        
        if (title && text) {
            if (title.textContent.includes('Workshop')) {
                title.textContent = contactTranslations.workshop.title;
                text.textContent = contactTranslations.workshop.text;
            } else if (title.textContent.includes('Photography')) {
                title.textContent = contactTranslations.photo.title;
                text.textContent = contactTranslations.photo.text;
            } else if (title.textContent.includes('Phone')) {
                title.textContent = contactTranslations.phone.title;
                text.textContent = contactTranslations.phone.text;
            }
        }
    });
}

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    // Carica le traduzioni
    loadTranslations();
    
    // Controlla se c'è una lingua salvata
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }
});