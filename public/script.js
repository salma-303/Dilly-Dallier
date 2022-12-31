const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});

// Sticky NavBar
window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    header.classList.toggle('sticy', window.scrollY > 0);
});

// Responsive NavBar
function toggleMenu(){
    const toggleMenu = document.querySelector('.toggleMenu');
    const nav = document.querySelector('.nav');
    toggleMenu.classList.toggle('active')
    nav.classList.toggle('active')
}

// SCroling Animation
window.addEventListener('scroll',function(){
    var anime = document.querySelectorAll('.animeX');

    for(var $ = 0; $ < anime.length; $++){
        var windowheight = this.window.innerHeight;
        var animetop = anime[$].getBoundingClientRect().top;
        var animepoint = 150;

        if(animetop < windowheight - animepoint){
            anime[$].classList.add('active');
        }
        else{
            anime[$].classList.remove('active');

        }
    }
})
