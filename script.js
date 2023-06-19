
const header = document.querySelector('.header');



// Scroll Animation
window.addEventListener('scroll', () =>{
    let scrollPos = window.scrollY;

    if(scrollPos > 20){
        header.classList.add('scrolled')
        
    } else {
        header.classList.remove('scrolled')
       

    }
})