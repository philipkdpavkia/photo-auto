import random

# Folder containing your images (replace with your actual path)
image_folder = "C:\\Users\\franc\\Documents\\blog_foto\\images"

# List all image filenames (modify if filenames follow a different pattern)
images = [f"blog-{i+1}.jpg" for i in range(136)]  # Generates list from blog-1.jpg to blog-136.jpg

def update_html(selected_image):
  """
  Updates the index.html file with the selected image path.
  """
  with open("index.html", "w") as f:
    f.write("""
      <!DOCTYPE html>
      <html lang="it">
      <section id="gallery" class="gallery">
        <div class="gallery-item fade-in">
          <img src="{}" alt="Gallery Image">
          <div class="gallery-item-overlay">
            <span>Explora</span>
          </div>
        </div>
        </section>
      </html>
    """.format(f"{image_folder}/{selected_image}"))

def main():
  """
  Selects a random image and updates the HTML file.
  """
  selected_image = random.choice(images)
  update_html(selected_image)

if __name__ == "__main__":
  main()