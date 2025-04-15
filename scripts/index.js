// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(arrayElement, deleteCard) {

    // склонировали структуру шаблона
    const newCard = cardTemplate.cloneNode(true);

    // у нового элемента нашли Title, Image, DeleteButton
    const cardTitle = newCard.querySelector('.card__title');
    const cardImg = newCard.querySelector('.card__image');
    const deleteButton = newCard.querySelector('.card__delete-button');

    // в новый элемент записали значения из параметра функции arrayElement
    cardTitle.textContent = arrayElement.name;
    cardImg.src = arrayElement.link;

    // в новом элементе к кнопке DeleteButton добавили обработчик. 
    // в deleteCard передаётся событие дефолтно из которого можно достать карту (target.closest)
    deleteButton.addEventListener('click', deleteCard);

    // вернули созданный заполненный элемент
    return newCard;
}

// @todo: Функция удаления карточки
function removeCard(event) {
    const card = event.target.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    console.log('Удалил', cardTitle.textContent);
    card.remove();
}

// @todo: Вывести карточки на страницу
function pushCards() {
    initialCards.forEach(function (item) {
        placesList.append(createCard(item, removeCard))
    });
}

pushCards();