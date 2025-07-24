// Правильно организован код взаимодействия с сервером:
// функции запросов к серверу описаны в отдельном файле api.js , а не в других модулях или index.js;
// ответ сервера всегда проверяется на корректность проверкой res.ok;
// действия с DOM-элементами на странице производятся только после завершения запроса;
// в конце цепочки обработки каждого промиса обращения к серверу есть обработка ошибок;
// базовый адрес сервера и ключ авторизации вынесены отдельно и переиспользуются;
// для вставки данных, полученных с сервера, на страницу не используется innerHTML.

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