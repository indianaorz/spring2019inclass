console.log("JavaScript is loaded");

function previewFile(){

    //selects the query named img
    var preview = document.querySelector('#image-preview'); 

    //sames as here
    var file    = document.querySelector('#image-input').files[0]; 
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;

        //Store the image
        localStorage.setItem("item-preview", reader.result);
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}

function changeColors(){
    //Change the color of every element
    var allElements = $("*").toArray();

    allElements.forEach(function(element){
        element.classList.add("transition-background-color");
        var r = Math.random() * 255;
        var g = Math.random() * 255;
        var b = Math.random() * 255;
        element.style.cssText = "background-color: rgb(" + r + "," + g + "," + b + ");";
    });
}


$( document ).ready(function() {

    // changeColors();
    // setInterval(function(){
    //     changeColors();
    // },1000000);

    

    //Check to see if image exists in storage
    var imagePreview = localStorage.getItem("item-preview");
    if(imagePreview != undefined){
        //Render the image
        //selects the query named img
        var preview = document.querySelector('#image-preview'); 

        preview.src = imagePreview;
    }


    console.log("Document is ready");
    $( "#menu" ).click(function() {
        $("#navigation-bar").toggleClass("navigation-bar--hidden");
        $("#content").toggleClass("content--no-navigation");
    });

    //Clicking ANY dropdown button
    $( ".dropdown__button").click(function() {
        //If we clicked on an open dropdown
        if($(this).siblings(".dropdown__list").hasClass("hidden") == false)
        {
            //Hide it
            $(this).siblings(".dropdown__list").addClass("hidden");
        }
        //Otherwise
        else{
            //Hide all of the list items
            $(".dropdown__list").addClass("hidden");
    
            //remove the hidden class from the clicked drop down
            $(this).siblings(".dropdown__list").removeClass("hidden");
        }
    });

    //When the FAB is clicked
    $( "#button-card-transition").click(function() {
        //animate button

        //Animate button when clicked
        // $("#button-card-transition")
        // .addClass("button-click");

        // //Remove the button click class after 
        // //The animation eds
        // setTimeout(function(){
        //     $("#button-card-transition")
        //     .removeClass("button-click");
        // },300);

        console.log("Button Clicked");
        //If the red card is faded out,
        //Fade in red, fade out blue
        if($(".card__red").hasClass("fade-through-out")){   
            fadeThrough(
                $(".card__blue"),
                $(".card__red")
            );
            rotateToggle(
                $("#icon-anchor"),
                $("#icon-switch")
            );
        }
        //If the red card is NOT faded out
        //Fade in blue fade out red
        else{    
            fadeThrough(
                $(".card__red"),
                $(".card__blue")
            );
            rotateToggle(
                $("#icon-switch"),
                $("#icon-anchor")
            );
        }
    });

    function fadeThrough(elementFadeOut, elementFadeIn){
            //Remove the fade in class from the red card
            elementFadeOut.removeClass("fade-through-in");
            //Fade out red content
            elementFadeOut.addClass("fade-through-out");

            //Remove the fade out class from the blue card
            elementFadeIn.removeClass("fade-through-out");
            //Add the fade in class to the blue card
            elementFadeIn.addClass("fade-through-in");
    }

    

    function rotateToggle(elementRotateOut, elementRotateIn){
        //Remove the fade in class from the red card
        elementRotateOut.removeClass("rotate-in");
        //Fade out red content
        elementRotateOut.addClass("rotate-out");

        //Remove the fade out class from the blue card
        elementRotateIn.removeClass("rotate-out");
        //Add the fade in class to the blue card
        elementRotateIn.addClass("rotate-in");
}



});
