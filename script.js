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
                    hideUpload();
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

function changeAppearance(imageName, buttonNumber) {
    // Get all buttons
    const buttons = $(`#${imageName}-container .carousel-caption .btn`);
    const map = ['Wedding', 'Engagement', 'Both']

    buttons.each(function(index, button) {
        if (index === buttonNumber - 1) {
            // Change the clicked button's appearance and text
            if ($(this).hasClass('active-button')) {
                $(this).removeClass('active-button');
                $(this).text(`Add to ${map[buttonNumber - 1]}`);
            } else {
                $(this).addClass('active-button');
                $(this).text(`Remove from ${map[buttonNumber - 1]}`);
            }
        } else {
            // Reset other buttons to their original appearance and text
            $(this).removeClass('active-button');
            $(this).text(`Add to ${map[index]} Album`);
        }
    })
}

function hideUpload() {
    const uploadDiv = document.getElementById("upload-file-div")
    const carouselDiv = document.getElementById("carousel-div")

    uploadDiv.style.height = "0px"
    carouselDiv.style.height = "93vh"
}

// Function to save button click to local storage
function saveAction(buttonNumber, imageName, action) {
    const timestamp = new Date().toLocaleString();
    const record = { imageName, action, timestamp };
    changeAppearance(imageName.split(".")[0], buttonNumber)
    // Retrieve existing history from local storage
    const history = JSON.parse(localStorage.getItem('imageActions')) || {};
    if(history.hasOwnProperty(imageName)) {
        delete history[imageName]
    } else {
        history[imageName] = action
    }
    // Save updated history back to local storage
    localStorage.setItem('imageActions', JSON.stringify(history));
}

// Function to initialize the carousel
function initializeCarousel(images) {
    const carouselItems = document.getElementById('carouselItems');

    images.forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.id = `${image.split(".")[0]}-container`
        carouselItem.innerHTML = `
            <img src="./images/${image}" class="d-block w-100" alt="${image}">
            <div class="carousel-caption d-md-block">
                <button class="btn btn-primary wedding" onclick="saveAction(1, '${image}', 'wedding')">Wedding Album</button>
                <button class="btn btn-secondary engagement" onclick="saveAction(2, '${image}', 'engagement')">Engagement Album</button>
                <button class="btn btn-warning both" onclick="saveAction(3, '${image}', 'both')">Both Album</button>
            </div>
        `;
        carouselItems.appendChild(carouselItem);
    });

    
    updateButtonAppearance()

}

function updateButtonAppearance() {
    const history = JSON.parse(localStorage.getItem('imageActions')) || {};
    
    for (let [imageName, buttonKey] of Object.entries(history)) {
        const button = $(`#${imageName.split(".")[0]}-container .carousel-caption .${buttonKey}`)
            button.addClass('active-button');
            button.text(`Remove from ${buttonKey}`);
    }
    
}

function copyFiles() {
    const jsonData = JSON.parse(localStorage.getItem('imageActions')) || {};

    if (jsonData) {
        // Create a Blob from the JSON string
        const blob = new Blob([jsonData], { type: "application/json" });

        // Create a temporary <a> element
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'selection.json'; // Set the file name

        // Append the <a> to the document and trigger the click event
        document.body.appendChild(a);
        a.click();

        // Remove the <a> element after download
        document.body.removeChild(a);
    } else {
        alert('No data found in localStorage.');
    }
}

$(document).ready(function () {
    fetchImageNames();
    
});
// Initialize carousel and history on page load
// document.addEventListener('DOMContentLoaded', () => {
//     // Mocked images directory for demo
    
// });