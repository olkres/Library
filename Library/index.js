(function () {
   const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.nav');//обращается к menu и записывает его в переменную
    const menuCloseItem = document.querySelector('.nav-close');
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('nav-active');
    });
    burgerItem.addEventListener('click', () => {//при клике на burgerItem(.burger) для menu(.nav) добавляется класс "nav-active"
        menu.classList.add('nav-active');
    });
}());
//const burger = document.querySelector('.burger');

//function toggleMenu() {
//  burger.classList.toggle('open');
//}
//burger.addEventListener('click', toggleMenu);

// slider
let offset = 0;
const sliderLine = document.querySelector('.images');

document.querySelector('.radio-1').addEventListener('click', function(){
    offset = 0;
    sliderLine.style.left = offset + 'px';
});

document.querySelector('.radio-2').addEventListener('click', function(){
    offset = - 475;
    sliderLine.style.left = offset + 'px';
});

document.querySelector('.radio-3').addEventListener('click', function(){
    offset = - 950;
    sliderLine.style.left = offset + 'px';
});