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

// const storageUsers = localStorage.getItem("users");
// let allUsers = storedUsers ? JSON.parse(storageUsers) : [];
// localStorage.setItem("users", JSON.stringify(allUsers));
const menuProfileIcon = document.querySelector('.profile');
const dropMenuAutorization = document.querySelector('.drop-menu');

let userInfo;

let formData = {};

const registrationForm = document.querySelector('.modal-register__form');
// const firstNameInput = document.getElementById('first__name');
// const lastNameInput = document.getElementById('last__name');
// const emailInput = document.getElementById('register__email');
// const passwordInput = document.getElementById('register__password');
// const registerButton = document.querySelector('.modal-register__button');



// отправка формы
registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('first__name').value;
  const lastName = document.getElementById('last__name').value;
  const email = document.getElementById('register__email').value;
  const password = document.getElementById('register__password').value;
  const cardNumber = (Math.floor(Math.random() * (0xffffffff - 0x10000000 + 1)) + 0x10000000).toString(16).toUpperCase().padStart(9, '0');

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
    сardNumber: cardNumber,
    listBooks: [],
    booksCounter: 0,
    counterAutorization: 0,
    abonement: false,
    autorization: false,
    registration: false
  };

  // const user = new userData(firstName, lastName, email, password, cardNumber);

  // добавление нового пользователя в массив
  // users.push(userData);

  // сохранение обновленного массива
  localStorage.setItem('users', JSON.stringify(users));

  let checkReg = false;

  users.forEach(item => {

    if(item.email === userData.email){
       checkReg = true;
    }else{
       checkReg = false;
    }

 })

 if(checkReg){
    alert('такой почтовый ящик уже зарегестрирован');
 }else{

    userInfo = userData;
    // userData.registration = true;
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users));

    updateAutorization()

    updateUsers()

    // clearForms()

 }
});

function updateAutorization(){
  checkActiveUser = true;

  users = JSON.parse(localStorage.getItem('users'));

  for (let i = 0; i < users.length; i++) {
     if (users[i].email === userInfo.email) {
        users[i].autorization = true;
        users[i].counterAutorization += 1;
        userInfo = users[i];
        break;
     }
  }

  localStorage.setItem('users', JSON.stringify(users));
};

function updateUsers() {
  users = JSON.parse(localStorage.getItem('users'));
      
  for (let i = 0; i < users.length; i++) {
     if (users[i].email === userInfo.email) {
        userInfo = users[i];
        break;
     }
  }
  
  localStorage.setItem('users', JSON.stringify(users));

  menuProfileIcon.innerHTML = '<span class="log-in-btn__title" title=${userInfo.firstName}${userInfo.lastName}>${userInfo.name[0] + userInfo.surname[0]}</span>'

  dropMenuAutorization.innerHTML = `<div class="drop-menu">
      <div class="drop-menu__profile-id">${userInfo.cardNumber}</div>
      <div class="drop-menu__login">My profile</div>
      <div class="drop-menu__register">Log Out</div>
      </div>`
}

function defaultView() {
  checkActiveUser = false;
      
  users = JSON.parse(localStorage.getItem('users'));
      
      for (let i = 0; i < users.length; i++) {
         if (users[i].email === userInfo.email) {
            users[i].autorization = false;
            userInfo = users[i];
            break;
         }
      }
      
      localStorage.setItem('users', JSON.stringify(users));

      //стандартная иконка пользователя
      menuProfileIcon.innerHTML = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM18.6667 7.77778C18.6667 10.3551 16.5774 12.4444 14.0001 12.4444C11.4227 12.4444 9.33339 10.3551 9.33339 7.77778C9.33339 5.20045 11.4227 3.11111 14.0001 3.11111C16.5774 3.11111 18.6667 5.20045 18.6667 7.77778ZM19.4998 16.2781C20.9584 17.7367 21.7778 19.715 21.7778 21.7778H14L6.22225 21.7778C6.22225 19.715 7.0417 17.7367 8.50031 16.2781C9.95893 14.8194 11.9372 14 14 14C16.0628 14 18.0411 14.8194 19.4998 16.2781Z" fill="white"/>
      </svg>`

      //drop menu
      dropMenuAutorization.innerHTML = `<div class="drop-menu">
      <div class="drop-menu__profile">Profile</div>
      <div class="drop-menu__login">Log In</div>
      <div class="drop-menu__register">Register</div>
      </div>`
};


