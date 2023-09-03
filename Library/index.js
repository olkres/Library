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
const modalLogin = document.querySelector('.modal-login');
const modalSign = document.querySelector('.modal-register');

openModalLogin.addEventListener('click', () => {
  modalLogin.classList.add('modal-active');
});

closeModalLogin.addEventListener('click', () => {
  modalLogin.classList.remove('modal-active');
});

openModalSign.addEventListener('click', () => {
  modalSign.classList.add('modal-active');
});

closeModalSign.addEventListener('click', () => {
  modalSign.classList.remove('modal-active');
});

modalLogin.addEventListener('click', (event) => {
  if(event.target.classList.contains('modal-login__container')) {
    modalLogin.classList.toggle('modal-active');
  }
});
modalSign.addEventListener('click', (event) => {
  if(event.target.classList.contains('modal-register__container')) {
    modalSign.classList.toggle('modal-active');
  }
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

//LOCAL STORAGE

const registrationForm = document.querySelector('.modal-register__form');
const firstNameInput = document.getElementById('first__name');
const lastNameInput = document.getElementById('last__name');
const emailInput = document.getElementById('register__email');
const passwordInput = document.getElementById('register__password');
// const registerButton = document.querySelector('.modal-register__button');

function generateRandomCardNumber() {
  const min = 0x10000000;
  const max = 0xffffffff;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const cardNumber = randomNumber.toString(16).toUpperCase().padStart(9, '0');
  return cardNumber;
}

// отправка формы
registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // длина пароля
  if (password.length < 8) {
    alert('Пароль должен содержать не менее 8 символов');
    return;
  }
  
  // валидность пароля
  const passwordRegex = /[A-Za-z0-9]/;
  if (!passwordRegex.test(password)) {
    alert('Пожалуйста, введите корректный пароль: только буквы и цифры');
    return;
  }

  // валидность email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Пожалуйста, введите корректный email-адрес');
    return;
  }

  // получение существующих пользователей
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // проверка, что пользователь с таким email не существует
  const existingUser = users.find(user => user.email === email);//если JSON.parse будет после
  if (existingUser) {                                           //этого, код не будет работать
    alert('Пользователь с таким email уже существует');
    return;
  }

  // объекта с данными пользователя
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    сardNumber: generateRandomCardNumber()
  };

  // добавление нового пользователя в массив
  users.push(userData);

  // сохранение обновленного массива
  localStorage.setItem('users', JSON.stringify(users));
  
  // очистка полей формы
  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
});

//АВТОРИЗАЦИЯ
const loginForm = document.querySelector('.modal-login__form');
const loginEmailInput = document.getElementById('login__email');
const loginPasswordInput = document.getElementById('login__password');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const enteredEmail = loginEmailInput.value;
  const enteredPassword = loginPasswordInput.value;

  // получение существующих пользователей
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // поиск пользователя с введенным email и паролем
  const loggedInUser = users.find(user => user.email === enteredEmail && user.password === enteredPassword);

  if (loggedInUser) {
    location.reload();
  } else {
    alert('Неверные данные для авторизации');
  }
});


