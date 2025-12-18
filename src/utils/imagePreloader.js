// Image preloader utility to load all images upfront for instant display

/**
 * Normalizes image path to ensure it works on all devices (mobile, desktop)
 * Ensures path starts with / and handles base URL correctly
 */
function normalizeImagePath(path) {
  // If path already starts with /, return as is
  if (path.startsWith('/')) {
    return path;
  }
  // Otherwise, add leading /
  return '/' + path;
}

// List of all image paths used in the app
const IMAGE_PATHS = [
  // BeautifulGirlScreen
  '/her_photo_one/IMG_1353.jpg',
  
  // PresentBeautifulGirlScreen
  '/her_photo_two/IMG_1538.jpg',
  '/her_photo_two/IMG_1527.jpg',
  
  // ChildhoodBeautifulScreen
  '/her_kid_photos/IMG_4802.jpg',
  '/her_kid_photos/IMG_4804.PNG',
  
  // SelfiesTogetherScreen
  '/selfies_together/IMG_0272.jpg',
  '/selfies_together/IMG_5692.jpg',
  '/selfies_together/IMG_1540.jpg',
  
  // MemoryGallery
  '/photos/IMG_6988.JPG',
  '/photos/IMG_7297.jpg',
].map(normalizeImagePath);

/**
 * Preloads a single image with retry logic
 * @param {string} src - Image source path
 * @param {number} retries - Number of retry attempts (default: 2)
 * @returns {Promise} Promise that resolves when image is loaded
 */
function preloadImage(src, retries = 2) {
  return new Promise((resolve) => {
    const normalizedSrc = normalizeImagePath(src);
    const img = new Image();
    
    img.onload = () => {
      // Force decode for better performance
      if (img.decode) {
        img.decode().then(() => resolve(img)).catch(() => resolve(img));
      } else {
        resolve(img);
      }
    };
    
    img.onerror = () => {
      if (retries > 0) {
        // Retry with a small delay
        setTimeout(() => {
          preloadImage(normalizedSrc, retries - 1).then(resolve);
        }, 100);
      } else {
        console.warn(`Failed to preload image after retries: ${normalizedSrc}`);
        resolve(null); // Resolve anyway to not block other images
      }
    };
    
    // Set src after handlers to ensure they're attached
    img.src = normalizedSrc;
  });
}

/**
 * Preloads all images in parallel
 * @returns {Promise} Promise that resolves when all images are loaded (or failed)
 */
export function preloadAllImages() {
  const promises = IMAGE_PATHS.map(path => preloadImage(path));
  return Promise.all(promises);
}

/**
 * Preloads images with progress callback
 * @param {Function} onProgress - Callback called with (loaded, total) progress
 * @returns {Promise} Promise that resolves when all images are loaded
 */
export function preloadAllImagesWithProgress(onProgress) {
  let loaded = 0;
  const total = IMAGE_PATHS.length;
  
  const promises = IMAGE_PATHS.map((path, index) => {
    return preloadImage(path).then((img) => {
      loaded++;
      if (onProgress) {
        onProgress(loaded, total);
      }
      return img;
    });
  });
  
  return Promise.all(promises);
}

