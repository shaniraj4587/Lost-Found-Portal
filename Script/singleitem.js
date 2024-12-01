// functoinality to open form
function openersingle() {
    document.getElementById('fatherofsingle').style.display = 'block';
}
// for single item
document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('fatherofsingle').style.display = 'none';
});



document.getElementById('single-item').addEventListener('click', () => {
    document.getElementById('fatherofsingle').style.display = 'none';
});

let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-image');
const totalImages = images.length;

// Function to show the next image in the carousel
function showNextImage() {
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    images[currentImageIndex].style.display = 'block';
}

// Function to show the previous image in the carousel
function showPrevImage() {
    images[currentImageIndex].style.display = 'none';
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    images[currentImageIndex].style.display = 'block';
}

// Set the carousel to auto-change images every 3 seconds
setInterval(showNextImage, 3000);

// Event listeners for carousel buttons
document.getElementById('nextBtn').addEventListener('click', showNextImage);
document.getElementById('prevBtn').addEventListener('click', showPrevImage);


// Add comment functionality
document.getElementById('addCommentBtn').addEventListener('click', () => {
    const commentText = document.getElementById('newComment').value.trim();
    if (commentText) {
        const commentsSection = document.getElementById('commentsSection');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
<img src="/Contents/profile.png" alt="User">
<div>
<strong>User Roll no./</strong>
<p>${commentText}</p>
</div>
`;
        commentsSection.appendChild(newComment);
        document.getElementById('newComment').value = '';
    }
});