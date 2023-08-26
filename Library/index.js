//burger
(function () {
   const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.nav');
    const menuCloseItem = document.querySelector('.nav-close');
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('nav-active');
    });
    //при клике на burgerItem(.burger) для menu(.nav) добавляется класс "nav-active"
    burgerItem.addEventListener('click', () => {
        menu.classList.add('nav-active');
    });
}());

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

//changing pictures
const radioButtons = document.querySelectorAll('.favorites-radio');
const items = document.querySelectorAll('.favorites__items');

items.forEach(function(item) {
  //Блок с active отображается
  if (item.classList.contains('active')) {
    item.style.display = 'flex';
  } else {
    item.style.display = 'none';
  }
});

radioButtons.forEach(function(radio) {
  radio.addEventListener('click', function() {
    // Получаем значение атрибута data-season выбранной кнопки
    const selectedSeason = this.parentElement.getAttribute('data-season');

    // Перебираем все блоки .favorites__items
    items.forEach(function(item) {
      if (item.id === selectedSeason) {
        // Если блок уже отображается, выходим из функции
        if (item.style.display === 'flex') return;

        // Удаляем active, если блок отображался ранее
        if (item.classList.contains('active')) {
          item.classList.remove('active');
          item.style.opacity = 0;
          setTimeout(function() {
            item.style.display = 'none';
          }, 1000);
        } else {
          // Применяем класс для fade in, если блок не отображался ранее
          item.style.display = 'flex';
          setTimeout(function() {
            item.style.opacity = 1;
          }, 50);
        }
      } else {
        // Прячем остальные блоки
        item.style.display = 'none';
        item.classList.remove('active');
        item.style.opacity = 0;
      }
    });
  });
});

//модальные окна signup/login 
const openModalLogin = document.getElementById('open-modal-login');
const openModalSign = document.getElementById('open-modal-sign');
const closeModalLogin = document.getElementById('modal-close-login');
const closeModalSign = document.getElementById('modal-close-sign');
const modalLogin = document.getElementById('modal-login');
const modalSign = document.getElementById('modal-register');

openModalLogin.addEventListener('click', function(e) {
  e.preventDefault();
  modalLogin.classList.add('modal-active');
});

closeModalLogin.addEventListener('click', function(e) {
  e.preventDefault();
  modalLogin.classList.remove('modal-active');
});

openModalSign.addEventListener('click', function(e) {
  e.preventDefault();
  modalSign.classList.add('modal-active');
});

closeModalSign.addEventListener('click', function(e) {
  e.preventDefault();
  modalSign.classList.remove('modal-active');
});
//смена окон login/register
const toRegister = document.querySelector('.modal-login__account');
const toLogin = document.querySelector('.modal-register__account');

toRegister.addEventListener('click', () => {
  modalLogin.classList.remove('modal-active');
  modalSign.classList.add('modal-active');
});

toLogin.addEventListener('click', () => {
  modalLogin.classList.add('modal-active');
  modalSign.classList.remove('modal-active');
});
//всплывающее меню возле иконки пользователя
const openDropMenu = document.querySelector('.profile');
const dropMenu = document.querySelector('.drop-menu');

openDropMenu.addEventListener('click', () => {
  dropMenu.classList.toggle('drop-menu-active');
});
//открывает login/register из dropmenu
const openDropMenuLogin = document.querySelector('.drop-menu__login');
const openDropMenuRegister = document.querySelector('.drop-menu__register');

openDropMenuLogin.addEventListener('click', () =>{
  modalLogin.classList.add('modal-active');
  dropMenu.classList.remove('drop-menu-active');
});

openDropMenuRegister.addEventListener('click', () =>{
  modalSign.classList.add('modal-active');
  dropMenu.classList.remove('drop-menu-active');
});