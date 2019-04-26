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

var clickedIndex = -1;

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

    //When we click on a gallery image
    $(".gallery-image").click(function(){
        //Show the dialog
        $("#dialog").removeClass("hidden");

        //Show the image we clicked on
        var clickedImage = $(this).attr('src');
        $(".image__display").attr('src', clickedImage);

        //Set the clicked index to the index of the image we clicked on
        clickedIndex = images.indexOf(clickedImage);
        console.log("Clicked on : " + clickedIndex);
    });

    //On clicking exit
    $(".dialog__exit").click(function(){
        //Remove the dialog
        $("#dialog").addClass("hidden");
    });

    //On clicking right
    $(".dialog__scroll-right").click(function(){
        clickedIndex += 1;

        if(clickedIndex >= images.length){
            clickedIndex -= images.length;
        }

        $(".image__display").addClass("gallery-click-right");
        setTimeout(function(){
            //Change the image according to the index
            $(".image__display").attr('src', images[clickedIndex]);
        }, 150);

        //Remove the animation class
        setTimeout(function(){
            $(".image__display").removeClass("gallery-click-right");
        },300);
    });

    
    //On clicking left
    $(".dialog__scroll-left").click(function(){
        clickedIndex -= 1;

        if(clickedIndex < 0){
            clickedIndex += images.length;
        }


        $(".image__display").addClass("gallery-click-left");
        setTimeout(function(){
            //Change the image according to the index
            $(".image__display").attr('src', images[clickedIndex]);
        }, 150);

        //Remove the animation class
        setTimeout(function(){
            $(".image__display").removeClass("gallery-click-left");
        },300);
    });

});