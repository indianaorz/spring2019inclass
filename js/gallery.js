var images = [
    "images/mountain.jfif",
    "images/download (1).jfif",
    "images/download (2).jfif",
    "images/download (3).jfif",
    "images/download (4).jfif",
    "images/download (5).jfif",
    "images/download (6).jfif",
    "images/download (7).jfif",
    "images/download (8).jfif",
    "images/download (9).jfif"
];


$( document ).ready(function() {
    images.forEach(function(image){
        var wrapper = document.createElement("div");
        wrapper.classList.add("gallery-image-wrapper");
        document.getElementById("gallery").appendChild(wrapper);

        var newImage = document.createElement("img");
        newImage.src = image;
        newImage.classList.add("gallery-image");
        wrapper.appendChild(newImage);
    });
});