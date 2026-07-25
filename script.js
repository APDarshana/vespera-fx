// This file is JavaScript - it's what makes a page DO things in response to actions,
// instead of just sitting there looking a certain way (that's CSS's job).

// We wait for the whole page to finish loading before running any of this.
// Otherwise the code might try to grab an element that doesn't exist yet.
document.addEventListener('DOMContentLoaded', () => {

  // Grab references to the lightbox pieces we'll need to control.
  // getElementById finds ONE element by its id="" attribute.
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxDownload = document.getElementById('lightboxDownload');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxName = document.getElementById('lightboxName');
  const lightboxMeta = document.getElementById('lightboxMeta');

  // querySelectorAll finds EVERY element matching a CSS selector - here, every .card.
  const cards = document.querySelectorAll('.card');

  // .forEach runs the same code once for each card found above.
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Inside THIS card, find its image and its label text.
      const img = card.querySelector('img');
      const label = card.querySelector('.label').textContent;

      // Copy that card's image into the lightbox's big image.
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;

      // Read the resolution and file size we stored on the card itself
      // (data-resolution and data-size attributes - see the HTML for these).
      lightboxName.textContent = label;
      lightboxMeta.textContent = card.dataset.resolution + ' · ' + card.dataset.size;

      // Point the download link at the same image, and give the downloaded
      // file a clean name based on the wallpaper's label instead of a random filename.
      lightboxDownload.href = img.src;
      lightboxDownload.setAttribute('download', label.replace(/\s+/g, '-').toLowerCase() + '.png');

      // Reveal the lightbox by adding the "open" class (see styles.css for what that triggers).
      lightbox.classList.add('open');
    });
  });

  // Clicking the X button closes the lightbox.
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });

  // Clicking the dark background (but NOT the image itself) also closes it.
  // e.target is whatever element was actually clicked - we only close if
  // that's the lightbox background itself, not something inside it.
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });

});
