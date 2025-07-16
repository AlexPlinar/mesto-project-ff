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
            isValid(formElement, inputElement, settings);
        });
    })
}

function isValid(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        console.log('НЕ ВАЛИДНО');
        inputElement.setCustomValidity('КАСТОМНОЕ СООБЩЕНИЕ')
        showInputError(formElement, inputElement, settings); // надо показать
    } else {
        console.log('ВАЛИДНО');
        hideInputError(formElement, inputElement, settings);
    }
}

function showInputError(formElement, inputElement, settings) {

}

function hideInputError(formElement, inputElement, settings) {
    
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