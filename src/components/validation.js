export function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    console.log(forms);

    forms.forEach((formElement) => {
        setEventListeners(formElement, settings);
    })
}

function setEventListeners(formElement, settings) {
    const inputs = formElement.querySelectorAll(settings.inputSelector);
    console.log(inputs);

    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
        });
    })
}

function checkInputValidity(formElement, inputElement, settings) {
    const regex = /^[a-zа-яё\s-]+$/i;
    const inputValue = inputElement.value.trim();

    if (inputValue && !regex.test(inputValue)) {
        inputElement.setCustomValidity('Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы');
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

function showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass); // добавляем класс на INPUT для стилизации рамок
    errorElement.classList.add(settings.errorClass); // добавляем класс на SPAN для вывода текста
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

export function clearValidation(settings) {

}


// addForm.addEventListener('input', handleAddFormInput);
// editForm.addEventListener('input', handleEditFormInput);

// function handleAddFormInput(evt) {
//     console.log(evt.target.validity);
// }

// function handleEditFormInput(evt) {
//     console.log(evt.target.validity);
// }