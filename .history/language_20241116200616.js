let currentLang = 'en';
let translations = null;

// Carica le traduzioni dal file JSON
async function loadTranslations() {
    try {
        const response = await fetch('/translations.json');
        translations = await response.json();
        
        // Controlla se c'è una lingua salvata
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            currentLang = savedLang;
        }
        
        // Inizializza le traduzioni
        updateAllContent();
    } catch (error) {
        console.error('Errore nel caricamento delle traduzioni:', error);
    }
}

// Funzione principale per il cambio lingua
function switchLanguage() {
    if (!translations) return;
    
    // Cambia la lingua
    currentLang = currentLang === 'en' ? 'it' : 'en';
    
    // Aggiorna il testo del bottone
    const langSwitch = document.getElementById('langSwitch');
    langSwitch.textContent = currentLang === 'en' ? 'IT' : 'EN';

    // Salva la preferenza
    localStorage.setItem('preferredLanguage', currentLang);

    // Aggiorna tutti i contenuti
    updateAllContent();
}

// Funzione che aggiorna tutti i contenuti
function updateAllContent() {
    if (!translations) return;
    
    // Aggiorna tutti gli elementi con data-translate
    updateTranslations();
    
    // Pagina specifica aggiornamenti
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
        updateHomePageContent();
    }
}

// Aggiorna tutti gli elementi con data-translate
function updateTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const keys = element.getAttribute('data-translate').split('.');
        let value = translations[currentLang];
        
        // Naviga attraverso l'oggetto translations seguendo il percorso delle chiavi
        for (const key of keys) {
            if (value) value = value[key];
        }
        
        // Aggiorna il contenuto se abbiamo trovato una traduzione
        if (value) element.textContent = value;
    });
}

// Aggiornamenti specifici per la home page
function updateHomePageContent() {
    // Menu già gestito da data-translate
    
    // Hero Section
    updateHeroSection();
    
    // About Section
    updateAboutSection();
    
    // Philosophy Section
    updatePhilosophySection();
    
    // Contact Section
    updateContactSection();
}

// Funzioni helper per sezioni specifiche
function updateHeroSection() {
    const heroTranslations = translations[currentLang].hero;
    
    updateWorkshopText('/workshop/cuba.html', heroTranslations.havana);
    updateWorkshopText('/workshop/senegal.html', heroTranslations.senegal);
    updateWorkshopText('/workshop/mexico.html', heroTranslations.mexico);
}

function updateWorkshopText(href, translations) {
    const workshopElement = document.querySelector(`a[href="${href}"] .workshop-text`);
    if (workshopElement) {
        const titleElement = workshopElement.querySelector('h2');
        const subtitleElement = workshopElement.querySelector('p');
        
        if (titleElement) titleElement.textContent = translations.title;
        if (subtitleElement) subtitleElement.textContent = translations.subtitle;
    }
}

function updateAboutSection() {
    const blogTranslations = translations[currentLang].blog;
    
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) sectionTitle.textContent = blogTranslations.title;
    
    const aboutTitle = document.querySelector('.about h2');
    if (aboutTitle) aboutTitle.textContent = blogTranslations.description;
    
    const paragraphs = document.querySelectorAll('.about p');
    if (paragraphs.length >= 3) {
        paragraphs[0].textContent = blogTranslations.text1;
        paragraphs[1].textContent = blogTranslations.text2;
        paragraphs[2].textContent = blogTranslations.text3;
    }
}

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

function updateContactSection() {
    const contactTranslations = translations[currentLang].contact;
    
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
    loadTranslations();
});