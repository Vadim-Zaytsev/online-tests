import {toggleElementsStateByQuerySelectorAll} from '/js/utils.js';
import {STATE} from '/js/constants.js';
import {ACTIVE_TIMERS} from '/js/constants.js';

function startTimer(ticketNumber) {
    const timerElement = document.getElementById('timer' + ticketNumber);

    let timeLeft = 20 * 60;

    document
        .getElementById('timerContainer' + ticketNumber)
        .style
        .display = 'block';

    return setInterval(function () {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.textContent = formattedMinutes + ':' + formattedSeconds;

        if (timeLeft <= 0) {
            clearInterval(ACTIVE_TIMERS[ticketNumber]);

            toggleElementsStateByQuerySelectorAll('.list-questions', STATE.DISABLED);
            toggleElementsStateByQuerySelectorAll('.list-tickets', STATE.ENABLED);
            toggleElementsStateByQuerySelectorAll('.start-btn', STATE.ENABLED);
            toggleElementsStateByQuerySelectorAll('.submit-btn', STATE.DISABLED);

            document
                .querySelectorAll('.list-tickets')
                .forEach(liElement => {
                    if (liElement.classList.contains('active')) {
                        liElement.style.boxShadow = '0px 0px 20px #CD5C5C';
                    }
                });

            M.toast({html: 'Время истекло. Вы не успели ответить на все вопросы.', classes: 'red'});
            return;
        }

        timeLeft--;
    }, 1000);
}

export {
    startTimer,
}