const translate = document.querySelectorAll('.translate');
const bigTitle = document.querySelector('.big-title');
const description = document.querySelector(".description")
const btnScroll = document.querySelector("header .scrollDown");
const header = document.querySelector("body");
let header_height = header.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * (speed + 9.0)}px)`;
    })

    bigTitle.style.opacity = - (scroll*2) / (header_height / 2) + 1;
    description.style.opacity = - (scroll*2) / (header_height / 2) + 1;
    btnScroll.style.opacity = - (scroll*2) / (header_height / 2) + 1;
})