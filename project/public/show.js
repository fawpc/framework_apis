function toggle() {
    show = document.getElementById("show");
    if(show.style.display == "none"){
    show.style.display = "block";
    } else {
    show.style.display = "none";
    }

    event.preventDefault();

    }