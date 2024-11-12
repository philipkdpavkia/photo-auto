import random
from bs4 import BeautifulSoup

# Usa path relativi
image_folder = "images"  # La cartella images è nella root del progetto
num_images = 136

def update_html():
    """
    Updates the gallery images in index.html while preserving the rest of the structure
    """
    # Leggi il file HTML esistente
    with open("index.html", "r", encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Seleziona 3 immagini random senza ripetizioni
    selected_images = random.sample([f"blog-{i+1}.jpg" for i in range(num_images)], 3)
    
    # Trova tutti gli elementi img nella gallery
    gallery_images = soup.select('.gallery-item img')
    
    # Aggiorna i src delle immagini
    for img, new_image in zip(gallery_images, selected_images):
        img['src'] = f"/{image_folder}/{new_image}"  # Assicurati che il path cominci con /
        img['alt'] = f"Gallery Image - {new_image}"

    # Scrivi l'HTML aggiornato
    with open("index.html", "w", encoding='utf-8') as f:
        f.write(str(soup.prettify()))

if __name__ == "__main__":
    update_html()