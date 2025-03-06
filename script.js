// Preload images
const totalImages = 38; // Number of images in the sequence
const imageContainer = document.getElementById('image-container-open');
let images = [];

// Preload and append image elements to the container
for (let i = 0; i < totalImages; i++) {
    let img = document.createElement('img');
    img.src = `images/image${i + 1}.jpg`; // Adjust the path according to your file structure
    img.dataset.index = i; // Store the index for easier reference
    images.push(img);
    imageContainer.appendChild(img);
}

let currentIndex = 0;

// Function to update the image and the text based on scroll position
function updateContent() {
    // Calculate the scroll percentage and scale it to make the poem complete at 75%
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const scaledScrollPercentage = Math.min(scrollPercentage * (1 / 0.75), 1);  // Scaling to 75%

    // Update the image index based on scroll
    const newIndex = Math.floor(scrollPercentage * (totalImages - 1));
    if (newIndex !== currentIndex) {
        // Fade out current image
        images[currentIndex].classList.remove('active');
        
        // Set new image
        currentIndex = newIndex;
        images[currentIndex].classList.add('active');
    }
    
    // Update the words visibility based on the scroll percentage
    const words = document.querySelectorAll('#poem-text-open span');
    const totalWords = words.length;
    const wordIndex = Math.floor(scaledScrollPercentage * totalWords);

    // Show words up to the current scroll position
    words.forEach((word, index) => {
        if (index <= wordIndex) {
            word.style.opacity = 1;
        } else {
            word.style.opacity = 0;
        }
    });

    // Update navigation text based on scroll position
    updateNavigationText(scrollPercentage);
}

// Function to update the navigation text
function updateNavigationText(scrollPercentage) {
    const navigation = document.getElementById('navigation-open');
    const scrollPosition = window.scrollY + window.innerHeight; // Scroll position plus viewport height
    const documentHeight = document.documentElement.scrollHeight;

    // Change navigation text based on scroll position and window size
    if (scrollPosition >= documentHeight) {
        navigation.innerHTML = 'Resize Window from Right';
    } else {
        navigation.innerHTML = 'Scroll';
    }
}

// Split the poem into words and wrap each word in a span
const poemText = document.getElementById('poem-text-open');
const words = poemText.innerText.split(' ').map(word => `<span>${word}</span>`).join(' ');
poemText.innerHTML = words;

// Initial image setup
images[currentIndex].classList.add('active');

// Listen for the scroll event
window.addEventListener('scroll', updateContent);

// Listen for the resize event to update navigation text
window.addEventListener('resize', () => updateNavigationText(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)));

// Initial call to set the correct navigation text on page load
updateNavigationText(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
