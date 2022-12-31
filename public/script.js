const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");
    email = document.getElementById("email");
    pass = document.getElementById("pass");
    form = document.getElementById("form");
    foem2 =document.getElementById("form2");
    errE=document.getElementById("errEmail");
    errP=document.getElementById("errPass");
    errEm=document.getElementById("errE");
    errP1=document.getElementById("errP1");
    errP2=document.getElementById("errP2");
    namme = document.getElementById("name");
    email1 = document.getElementById("email1");
    pass1 = document.getElementById("pass1");
    pass2 = document.getElementById("pass2");
    acc = document.getElementById("accept");
    errAccept = document.getElementById("errAccept");
    errName= document.getElementById("errName")

//------------------------------------------------
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
//------------------------------------------------
//handle frontend validation login
form.addEventListener("submit",(e)=>{
    console.log(email.value);
    console.log(pass.value);
    let messages="";
    if(email.value.length >50 ){
        console.log("??99")
        messages='Email is too long';
        errEmail.innerText = messages;
        e.preventDefault();
    }
    var decimal=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(!pass.value.match(decimal)){
        messages='password must between 8 to 15 characters contains lowercase & uppercase letter, numeric digit, special character';
        errP.innerText = messages;
        e.preventDefault();  
    } 
});
//-----------------------------------------
//handle frontend validation login regester
form2.addEventListener("submit",(e)=>{
    console.log(email1.value);
    console.log(pass1.value);
    let messages="";
    if(namme.value.length >50 ){
        console.log("??99")
        messages='Name is too long';
        errName.innerText = messages;
        e.preventDefault();
    }
    if(email1.value.length >50 ){
        console.log("??99")
        messages='Email is too long';
        errEm.innerText = messages;
        e.preventDefault();
    }
    var decimal=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(!pass1.value.match(decimal)){
        messages='password must between 8 to 15 characters contains lowercase & uppercase letter, numeric digit, special character';
        errP1.innerText = messages;
        e.preventDefault();  
    } 
    if(pass1.value != pass2.value){
        messages='passworde are not matching';
        errP2.innerText = messages;
        e.preventDefault();
    }
    console.log("why")
    console.log(acc.value);
    // if(acc == undefined){
    //     messages='please check here';
    //     errAccept.innerText = messages;
    //     e.preventDefault();  
    // } 
});
//------------------------------------------------
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
//-----------------------------------------------
// Responsive NavBar
function toggleMenu(){
    const toggleMenu = document.querySelector('.toggleMenu');
    const nav = document.querySelector('.nav');
    toggleMenu.classList.toggle('active')
    nav.classList.toggle('active')
}
//-----------------------------------------------
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