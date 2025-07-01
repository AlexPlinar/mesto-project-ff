import './pages/index.css';

import { initialCards } from './scripts/cards.js';
import { createCard, removeCard, likeCard } from './components/card.js'
import { openPopup, closePopup } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const addForm = document.forms['new-place'];
const editForm = document.forms['edit-profile'];
const places = document.querySelector('.places');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const cardNameInput = addForm.querySelector('.popup__input_type_card-name')
const cardUrlInput = addForm.querySelector('.popup__input_type_url');
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');

addForm.addEventListener('submit', handleAddFormSubmit)
editForm.addEventListener('submit', handleEditFormSubmit);

editButton.addEventListener('click', () => {
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
    openPopup(editPopup);
});

addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
});

places.addEventListener('click', (evt) => {
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

    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;

    openPopup(imagePopup);
});

function handleEditFormSubmit(evt) {
    evt.preventDefault();

    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value;

    editForm.reset();
    closePopup(editPopup);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const card = {
        name: cardNameInput.value,
        link: cardUrlInput.value,
    }

    pushCards(card);
    addForm.reset();
    closePopup(newCardPopup);
}
 
function pushCards(data) {

    if (Array.isArray(data)) {
        data.forEach(function (item) {
            placesList.append(createCard(item, removeCard, likeCard))
        });
    }
    else {
        placesList.prepend(createCard(data, removeCard, likeCard))
    };
};

pushCards(initialCards);
export { pushCards };



