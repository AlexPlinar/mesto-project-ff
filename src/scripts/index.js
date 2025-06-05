import { createCard, removeCard, pushCards } from '../components/card.js'
export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');

pushCards();

function handleEditFormSubmit(evt) {
    evt.preventDefault();

    const formElement = evt.target.closest('.popup__form');
    const nameInput = formElement.querySelector('.popup__input_type_name');
    const jobInput = formElement.querySelector('.popup__input_type_description');
    const popup = formElement.closest('.popup');
    const closeButton = popup.querySelector('.popup__close');

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    formElement.reset();
    formElement.removeEventListener('submit', handleEditFormSubmit);
    closeButton.click();
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const formElement = evt.target.closest('.popup__form');
    const nameInput = formElement.querySelector('.popup__input_type_card-name');
    const urlInput = formElement.querySelector('.popup__input_type_url');
    const popup = formElement.closest('.popup');
    const closeButton = popup.querySelector('.popup__close');

    const card = {
        name: nameInput.value,
        link: urlInput.value,
    }
    placesList.prepend(createCard(card, removeCard));

    formElement.reset();
    formElement.removeEventListener('submit', handleEditFormSubmit);
    closeButton.click();
}

function openPopup(popupSelector) {
    const popup = document.querySelector(popupSelector);

    if (popup.classList.contains('popup_type_edit')) {
        const formElement = popup.querySelector('.popup__form');
        formElement.addEventListener('submit', handleEditFormSubmit);
    };

    if (popup.classList.contains('popup_type_new-card')) {
        const formElement = popup.querySelector('.popup__form');
        formElement.addEventListener('submit', handleAddFormSubmit);
    };

    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopup);

    document.addEventListener('keydown', escClose);
}

function openImagePopup(evt) {
    const card = evt.target.closest('.card');

    if (
        !card ||
        evt.target.classList.contains('card__delete-button') ||
        evt.target.classList.contains('card__like-button')
    ) {
        return;
    }

    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const imagePopup = document.querySelector('.popup_type_image');

    imagePopup.querySelector('.popup__image').src = cardImage.src;
    imagePopup.querySelector('.popup__image').alt = cardImage.alt;
    imagePopup.querySelector('.popup__caption').textContent = cardTitle.textContent;

    openPopup('.popup_type_image');
}

function closePopup(evt) {

    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        const popup = evt.currentTarget;
        popup.classList.remove('popup_is-opened');
        popup.removeEventListener('click', closePopup);

        document.removeEventListener('keydown', escClose);
    }
}

function escClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            openedPopup.classList.remove('popup_is-opened');

            const closeButton = openedPopup.querySelector('.popup__close');
            closeButton.removeEventListener('click', closePopup);

            document.removeEventListener('keydown', escClose);
        }
    }
}

const places = document.querySelector('.places');
places.addEventListener('click', openImagePopup);

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => openPopup('.popup_type_edit'));

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => openPopup('.popup_type_new-card'));

