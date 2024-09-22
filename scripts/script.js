document.getElementById('imageUpload').addEventListener('change', async (event) => {
    const files = event.target.files;
    const gallery = document.getElementById('gallery');
    let imgArray = [];
    let currentIndex = 0;
    for (let file of files) {
        if (!file.type.startsWith('image/')) {
            continue;
        }
        let img = document.createElement("img");
        img.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            imgArray.push(e.target.result);
        }
        try {
            reader.readAsDataURL(file);
            gallery.appendChild(img);
        } catch (e) {
            console.error('Failed to append image to gallery:', e);
            console.error('Failed to read file data:', e);
        }
    }
    let images = document.querySelectorAll('#gallery img');
    let wrapper = document.querySelector('.image-wrapper');
    let fullImage = document.querySelector('.image-wrapper img');
    let leftArrow = document.querySelector('.image-wrapper .left-arrow');
    let rightArrow = document.querySelector('.image-wrapper .right-arrow');
    let closeButton = document.querySelector('.image-wrapper span');
    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            openModal(image.src);
            currentIndex = index;
        });
        closeButton.addEventListener('click', () => {
            wrapper.style.display = 'none';
        });
    });
    leftArrow.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = imgArray.length - 1;
        }
        fullImage.src = imgArray[currentIndex];
    });
    rightArrow.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex > imgArray.length - 1) {
            currentIndex = 0;
        }
        fullImage.src = imgArray[currentIndex];
    });

    function openModal(pic) {
        wrapper.style.display = 'flex';
        fullImage.src = pic;
    }
});
