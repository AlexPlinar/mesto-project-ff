import './pages/index.css';

import { initialCards } from './scripts/cards.js';
import { createCard, removeCard, likeCard } from './components/card.js'
import { openPopup, closePopup } from './components/modal.js';

import { enableValidation, clearValidation } from './components/validation.js';
import { fetchUserInfo, fetchCards, updateUserInfo, postCard, updateAvatar } from './scripts/api.js';

const placesList = document.querySelector('.places__list');
const addForm = document.forms['new-place'];
const editForm = document.forms['edit-profile'];
const avatarForm = document.forms['edit-profile-image'];
const places = document.querySelector('.places');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditBtn = document.querySelector('.profile__image-edit-button');

const avatarPopup = document.querySelector('.popup_type_edit_profile_image');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const cardNameInput = addForm.querySelector('.popup__input_type_card-name')
const cardUrlInput = addForm.querySelector('.popup__input_type_url');
const avatarUrlInput = avatarForm.querySelector('.popup__input_type_url');
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__description');
const currentImage = document.querySelector('.profile__image');

addForm.addEventListener('submit', handleAddFormSubmit)
editForm.addEventListener('submit', handleEditFormSubmit);
avatarPopup.addEventListener('submit', handleAvatarFormSubmit);

avatarEditBtn.addEventListener('click', () => {
    openPopup(avatarPopup);
    clearValidation(avatarForm, settings);
});

editButton.addEventListener('click', () => {
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
    openPopup(editPopup);
});

addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
    clearValidation(addForm, settings);
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

function toggleSaveText(evt, isSaving) {
    const saveButton = evt.submitter;
    if (isSaving) {
        saveButton.dataset.originalText = saveButton.textContent;
        saveButton.textContent = 'Сохранение...';
        saveButton.disabled = true;
    } else {
        saveButton.textContent = saveButton.dataset.originalText;
        saveButton.disabled = false;
    }
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    toggleSaveText(evt, true);

    updateAvatar(avatarUrlInput.value)
        .then(data => {
            renderUserInfo(data);
            avatarForm.reset();
            closePopup(avatarPopup);
            toggleSaveText(evt, false);
        })
        .catch(error => {
            console.log(`Ошибка: ${error}`);
        });
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    toggleSaveText(evt, true);

    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value;

    updateUserInfo(currentName.textContent, currentJob.textContent)
        .then(data => {
            toggleSaveText(evt, false);
            editForm.reset();
            closePopup(editPopup);
        })
        .catch(error => {
            console.log(`Ошибка: ${error}`);
        })


}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    toggleSaveText(evt, true);

    const card = {
        name: cardNameInput.value,
        link: cardUrlInput.value,
    }

    postCard(card)
        .then(serverCard => {
            console.log('Карта добавлена на сервер: ');
            console.log(serverCard);
            pushCards(serverCard);
            closePopup(newCardPopup);
            addForm.reset();
            toggleSaveText(evt, false);
        })
        .catch(error => {
            console.log(`Ошибка при добавлении карточки: ${error}`);
        })
}

export function pushCards(data) {

    if (Array.isArray(data)) {
        data.forEach(function (item) {
            placesList.append(createCard(item, removeCard, likeCard))
        });
    }
    else {
        placesList.prepend(createCard(data, removeCard, likeCard))
    };
};

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
enableValidation(settings);

function renderUserInfo(data) {
    const { name, about, avatar } = data;
    currentName.textContent = name;
    currentJob.textContent = about;
    currentImage.style.backgroundImage = `url(${avatar})`;
}

Promise.all([fetchUserInfo(), fetchCards()])
    .then(([userData, cardsData]) => {
        renderUserInfo(userData);
        pushCards(cardsData);
    })
    .catch(error => {
        console.log(`Ошибка: ${error}`);
    });



