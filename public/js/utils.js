import {STATE} from '/js/constants.js';

function toggleElementsStateByQuerySelectorAll(selector, state) {
    const elements = document.querySelectorAll(selector);

    switch (state) {
        case STATE.DISABLED:
            elements.forEach(element => {
                if (!element.classList.contains('active')) {
                    element.disabled = true;
                    element.style.pointerEvents = 'none';
                    element.style.opacity = '0.5';
                    element.setAttribute('tabindex', '-1');
                }

            });
            break;
        case STATE.ENABLED:
            elements.forEach(element => {
                if (!element.classList.contains('active')) {
                    element.disabled = false;
                    element.style.pointerEvents = 'auto';
                    element.style.opacity = '1';
                    element.setAttribute('tabindex', '0');
                }
            });
            break;
    }
}

function pointToCorrectAnswer(formElement) {
    formElement
        .querySelector('input[name="answer"][data-iscorrect="true"]')
        .nextElementSibling
        .innerHTML += ' <em>(правильный ответ)</em>';
}

function setLifetimeFlashMessages(numberMilliseconds) {
    const flashMessage = document.querySelector('.flash-message');

    if (flashMessage) {
        setTimeout(() => {
            flashMessage.style.display = 'none';
        }, numberMilliseconds);
    }
}

function showContent(contentId) {
    document
        .querySelectorAll('.content > div')
        .forEach((div) => {
            div.classList.add('hidden');
        });
    document
        .getElementById(contentId)
        .classList
        .remove('hidden');
}

export {
    toggleElementsStateByQuerySelectorAll,
    pointToCorrectAnswer,
    setLifetimeFlashMessages,
    showContent,
};