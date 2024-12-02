import random
from bs4 import BeautifulSoup

# Configurazione delle immagini
image_config = {
    'gallery': {
        'folder': 'images',
        'prefix': 'blog-',
        'count': 136
    },
    'cuba': {
        'folder': 'images/cuba',
        'prefix': 'cub-',
        'count': 4  # Modifica questo numero in base a quante foto hai nella cartella
    },
    'senegal': {
        'folder': 'images/senegal',
        'prefix': 'sen-',
        'count': 30  # Modifica questo numero in base a quante foto hai nella cartella
    },
    'mexico': {
        'folder': 'images/mexico',
        'prefix': 'mex-',
        'count': 38  # Modifica questo numero in base a quante foto hai nella cartella
    }
}

def get_random_image(config):
    """
    Genera un path casuale per un'immagine basato sulla configurazione fornita
    """
    number = random.randint(1, config['count'])
    return f"/{config['folder']}/{config['prefix']}{number}.webp"

def update_html():
    """
    Aggiorna sia le immagini della gallery che quelle dei workshop in index.html
    """
    # Leggi il file HTML esistente
    with open("index.html", "r", encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Aggiorna le immagini della gallery principale
    gallery_images = soup.select('.gallery-item img')
    selected_gallery_images = [get_random_image(image_config['gallery']) for _ in range(3)]
    
    for img, new_image in zip(gallery_images, selected_gallery_images):
        img['src'] = new_image
        img['alt'] = f"Gallery Image - {new_image.split('/')[-1]}"

    # Aggiorna le immagini dei workshop nella hero section
    workshop_links = soup.select('.workshop-link img')
    
    # Aggiorna l'immagine di Cuba
    cuba_img = workshop_links[0]
    cuba_img['src'] = get_random_image(image_config['cuba'])
    
    # Aggiorna l'immagine del Senegal
    senegal_img = workshop_links[1]
    senegal_img['src'] = get_random_image(image_config['senegal'])
    
    # Aggiorna l'immagine del Messico
    mexico_img = workshop_links[2]
    mexico_img['src'] = get_random_image(image_config['mexico'])

    # Scrivi l'HTML aggiornato
    with open("index.html", "w", encoding='utf-8') as f:
        f.write(str(soup.prettify()))

if __name__ == "__main__":
    update_html()