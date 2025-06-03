import { initialCards } from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(arrayElement, deleteCard) {

    // склонировали структуру шаблона. 
    const newCardFragment = cardTemplate.cloneNode(true);

    // в newCard находится временный DocumentFragment. Он очистится после append(). 
    // буду напрямую работать с .card, а не с временным DocumentFragment
    const newCard = newCardFragment.querySelector('.card');

    // у нового элемента нашли Title, Image, DeleteButton
    const cardTitle = newCard.querySelector('.card__title');
    const cardImg = newCard.querySelector('.card__image');
    const deleteButton = newCard.querySelector('.card__delete-button');

    // в новый элемент записали значения из параметра функции arrayElement
    cardTitle.textContent = arrayElement.name;
    cardImg.src = arrayElement.link;
    cardImg.alt = `Фотография места: ${arrayElement.name}`;

    // в новом элементе к кнопке DeleteButton добавили обработчик. 
    // в deleteCard передаётся событие дефолтно из которого можно достать карту (target.closest)
    deleteButton.addEventListener('click', () => deleteCard(newCard));

    // вернули созданный заполненный элемент
    return newCard;
}

// @todo: Функция удаления карточки
function removeCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
function pushCards() {
    initialCards.forEach(function (item) {
        placesList.append(createCard(item, removeCard))
    });
}

pushCards();

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const places = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');

const popups = document.querySelectorAll('.popup');

editButton.addEventListener('click', () => {
    editPopup.classList.toggle('popup_is-opened');
});

newCardButton.addEventListener('click', () => {
    newCardPopup.classList.toggle('popup_is-opened');
});

places.addEventListener('click', (evt) => {
    imagePopup.classList.toggle('popup_is-opened');
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    
    const card = evt.target.closest('.card');
    const caption = card.querySelector('.card__title');
    imagePopup.querySelector('.popup__caption').textContent = caption.textContent;
});

popups.forEach((elem) => {
    elem.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
            elem.classList.toggle('popup_is-opened');
        }
    })
})
