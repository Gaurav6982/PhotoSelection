// Function to fetch image names from JSON file
function fetchImageNames() {
    document.getElementById('jsonFile').addEventListener('change', function(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    console.log(jsonData);
                    initializeCarousel(jsonData)
                    // You can use this data further in your app
                } catch (error) {
                    alert('Invalid JSON file');
                    console.error(error);
                }
            };
            reader.readAsText(file);
        }
    });
}

// Function to save button click to local storage
function saveAction(imageName, action) {
    const timestamp = new Date().toLocaleString();
    const record = { imageName, action, timestamp };
    
    // Retrieve existing history from local storage
    const history = JSON.parse(localStorage.getItem('imageActions')) || {};
    history[imageName] = action
    console.log(history)
    // Save updated history back to local storage
    localStorage.setItem('imageActions', JSON.stringify(history));
}

// Function to initialize the carousel
function initializeCarousel(images) {
    const carouselItems = document.getElementById('carouselItems');

    images.forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `
            <img src="./images/${image}" class="d-block w-100" alt="${image}">
            <div class="carousel-caption d-md-block">
                <button class="btn btn-primary" onclick="saveAction('${image}', 'wedding')">Wedding Album</button>
                <button class="btn btn-secondary" onclick="saveAction('${image}', 'engagement')">Engagement Album</button>
                <button class="btn btn-warning" onclick="saveAction('${image}', 'both')">Both Album</button>
            </div>
        `;
        carouselItems.appendChild(carouselItem);
    });
}

// Initialize carousel and history on page load
document.addEventListener('DOMContentLoaded', () => {
    // Mocked images directory for demo
    fetchImageNames();
    
});