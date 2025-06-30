import { closePopup } from "./modal";
import { pushCards } from "../scripts";

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    
    const popup = evt.target.closest('.popup');
    const formElement = evt.target.closest('.popup__form');
    const nameInput = formElement.querySelector('.popup__input_type_name');
    const jobInput = formElement.querySelector('.popup__input_type_description');

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    formElement.reset();
    closePopup(popup);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const popup = evt.target.closest('.popup');
    const formElement = evt.target.closest('.popup__form');
    const nameInput = formElement.querySelector('.popup__input_type_card-name');
    const urlInput = formElement.querySelector('.popup__input_type_url');
    const card = {
        name: nameInput.value,
        link: urlInput.value,
    }

    pushCards(card);
    formElement.reset();
    closePopup(popup);
}

export { handleAddFormSubmit, handleEditFormSubmit };