const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42/',
    headers: {
        authorization: '57b344a3-8ce6-4ef9-b27c-b28775bc979e',
    }
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export function fetchUserInfo() {
    return fetch(`${config.baseUrl}users/me`, {
        headers: config.headers
    })
        .then(checkResponse);
}

export function fetchCards() {
    return fetch(`${config.baseUrl}cards`, {
        headers: config.headers
    })
        .then(checkResponse);
}

export function updateUserInfo(currentName, currentJob) {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: currentName,
            about: currentJob
        })
    })
        .then(checkResponse);
}

export function postCard(card) {
    return fetch(`${config.baseUrl}cards`, {
        method: 'POST',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    })
        .then(checkResponse);
}

export function deleteCardFromServer(cardId) {
    return fetch(`${config.baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse);
}

export function likeCardOnServer(cardId) {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse);
}

export function unlikeCardOnServer(cardId) {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse);
}

export function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar: avatar})
    })
        .then(checkResponse);
}