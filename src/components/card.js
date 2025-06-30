const cardTemplate = document.querySelector('#card-template').content;

function createCard(arrayElement, deleteCard, like, openImage) {

    const newCardFragment = cardTemplate.cloneNode(true);
    const newCard = newCardFragment.querySelector('.card');

    const cardTitle = newCard.querySelector('.card__title');
    const cardImg = newCard.querySelector('.card__image');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');

    cardTitle.textContent = arrayElement.name;
    cardImg.src = arrayElement.link;
    cardImg.alt = `Фотография места: ${arrayElement.name}`;

    cardImg.addEventListener('click', (evt) => openImage(evt));
    deleteButton.addEventListener('click', () => deleteCard(newCard));
    likeButton.addEventListener('click', () => like(newCard));

    return newCard;
}

function removeCard(card) {
    card.remove();
}

function likeCard(card) {
    const likeButton = card.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, removeCard, likeCard };