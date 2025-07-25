export function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    console.log(forms);

    forms.forEach((formElement) => {
        setEventListeners(formElement, settings);
    })
}

function setEventListeners(formElement, settings) {
    const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);

    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputs, submitButton, settings);
        });
    })
}

function checkInputValidity(formElement, inputElement, settings) {
    const regex = /^[a-zа-яё\s-]+$/i;
    const inputValue = inputElement.value.trim();

    if (inputValue && !regex.test(inputValue) && inputElement.type !== 'url') {
        inputElement.setCustomValidity('Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
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
    inputElement.classList.add(settings.inputErrorClass); 
    errorElement.classList.add(settings.errorClass); 
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

export function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
        inputElement.setCustomValidity('');
    });
    toggleButtonState(inputList, buttonElement, settings);
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(inputList, submitButton, settings) {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add(settings.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(settings.inactiveButtonClass);
        submitButton.disabled = false;
    }
}
