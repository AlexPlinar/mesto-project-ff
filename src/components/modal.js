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
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;

    openPopup('.popup_type_image');
}

function openPopup(popupSelector) {
    const popup = document.querySelector(popupSelector);

    if (popup.classList.contains('popup_type_edit')) {
        
        const formElement = popup.querySelector('.popup__form');
        const nameInput = formElement.querySelector('.popup__input_type_name');
        const jobInput = formElement.querySelector('.popup__input_type_description');
        const currentName = document.querySelector('.profile__title');
        const currentJob = document.querySelector('.profile__description'); 

        nameInput.value = currentName.textContent;
        jobInput.value = currentJob.textContent;
    }

    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscClose);
}

function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    };
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscClose);
}

export { openPopup, openImagePopup, closePopup };