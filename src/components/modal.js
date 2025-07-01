function openPopup(popup) {
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

export { openPopup, closePopup };