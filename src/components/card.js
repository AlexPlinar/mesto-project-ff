import { deleteCardFromServer, likeCardOnServer, unlikeCardOnServer } from "../scripts/api";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(arrayElement, deleteCard, like, userId, handleCardClick) {

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

    cardImg.addEventListener('click', () => handleCardClick(arrayElement));

    arrayElement.likes.forEach(likeElement => {
        if (likeElement._id === userId) {
            like(newCard);
        }
    });

    if (arrayElement.owner._id !== userId) {
        deleteButton.classList.add('card__delete-button_hidden');
        deleteButton.disabled = true;
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCardFromServer(arrayElement._id)
                .then(res => {
                    console.log('Удаление успешно');
                    deleteCard(newCard);
                })
                .catch(error => console.log(`Ушибка при удалении:  ${error}`));
        });
    }

    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');
        const reqest = isLiked ?
            unlikeCardOnServer(arrayElement._id)
            : likeCardOnServer(arrayElement._id);

        reqest
            .then(res => {
                like(newCard);
                likeCounter.textContent = res.likes.length;
            })
            .catch(error => console.log(`Ушибка при ${isLiked ? 'удалении' : 'добавлении'}:  ${error}`));
    });

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