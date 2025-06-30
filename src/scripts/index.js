import { initialCards } from '../scripts/cards.js';
import { createCard, removeCard, likeCard } from '../components/card.js'
import { openPopup, openImagePopup } from '../components/modal.js';
import { handleAddFormSubmit, handleEditFormSubmit } from '../components/form-handlers.js';

const placesList = document.querySelector('.places__list');
const addForm = document.forms['new-place'];
const editForm = document.forms['edit-profile'];
const places = document.querySelector('.places');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

addForm.addEventListener('submit', handleAddFormSubmit)
editForm.addEventListener('submit', handleEditFormSubmit);
places.addEventListener('click', openImagePopup);
editButton.addEventListener('click', () => openPopup('.popup_type_edit'));
addButton.addEventListener('click', () => openPopup('.popup_type_new-card'));

function pushCards(cardData) {

    if (Array.isArray(cardData)) {
        cardData.forEach(function (item) {
            placesList.append(createCard(item, removeCard, likeCard, openImagePopup))
        });
    }
    else {
        placesList.prepend(createCard(cardData, removeCard, likeCard, openImagePopup))
    };
};

pushCards(initialCards);
export { pushCards };



