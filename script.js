const accessKey = "Qlcx1W9zf30qJ29sAzz1htS0P5430UGikyiLxdw99NE";
const searchform = document.getElementById("search-form");
const searchbox = document.getElementById("search-box");
const searchresult = document.getElementById("search-result");
const showmorebtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayImages(data.results);
        
        // Show the "Show More" button if there are more results
        if (data.results.length > 0) {
            showmorebtn.style.display = 'block';
        } else {
            showmorebtn.style.display = 'none';
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.small; // Use the small version of the image
        imgElement.alt = image.alt_description;
        searchresult.appendChild(imgElement);
    });
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset to the first page
    searchresult.innerHTML = ""; // Clear previous results
    searchImages();
});

// Show more button functionality
showmorebtn.addEventListener("click", () => {
    page++; // Increment the page number
    searchImages(); // Fetch more images
});

const images = document.querySelectorAll('.masonry img');
images.forEach(img => {
  img.onload = () => {
    const height = img.clientHeight;
    img.style.gridRowEnd = `span ${Math.ceil(height / 10)}}})`; // Adjust based on your grid row height
  };
});
