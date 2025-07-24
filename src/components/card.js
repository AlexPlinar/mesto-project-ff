const cardTemplate = document.querySelector('#card-template').content;

function createCard(arrayElement, deleteCard, like) {

    const newCardFragment = cardTemplate.cloneNode(true);
    const newCard = newCardFragment.querySelector('.card');

    const cardTitle = newCard.querySelector('.card__title');
    const cardImg = newCard.querySelector('.card__image');
    const deleteButton = newCard.querySelector('.card__delete-button');
    const likeButton = newCard.querySelector('.card__like-button');
    const likeCounter = newCard.querySelector('.card__like-counter');

    cardTitle.textContent = arrayElement.name;
    cardImg.src = arrayElement.link;
    cardImg.alt = `Фотография места: ${arrayElement.name}`;
    likeCounter.textContent = arrayElement.likes.length;

    if (arrayElement.owner._id !== '0d4ae9487faefafd4947f3cc') {
        deleteButton.classList.add('card__delete-button_hidden');
        deleteButton.disabled = true;
    } else {
        deleteButton.addEventListener('click', () => deleteCard(newCard));
    }

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