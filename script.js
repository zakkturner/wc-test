
const header = document.querySelector('.header');
const tab1 = document.querySelector('tab-1');
const tab2 = document.querySelector('tab-2');
const tab3 = document.querySelector('tab-3');
const tabs = document.querySelectorAll('features-accordion-tabs')
tabs.forEach(tab => {
    tab.addEventListener('click', () =>{
        alert('clicked')
        console.log(tab)
    })
});


// Scroll Animation
window.addEventListener('scroll', () =>{
    let scrollPos = window.scrollY;

    if(scrollPos > 20){
        header.classList.add('scrolled')
        
    } else {
        header.classList.remove('scrolled')
       

    }
})