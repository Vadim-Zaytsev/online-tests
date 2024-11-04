import {ACTIVE_TIMERS} from '/js/constants.js';
import {startTimer} from '/js/modules/tickets/solutionTicket/startTimer.js';
import {toggleElementsStateByQuerySelectorAll} from '/js/utils.js';
import {STATE} from '/js/constants.js';

function startSolving() {
    document
        .querySelectorAll('.start-btn')
        .forEach(function (btn) {
            btn.addEventListener('click', function () {
                const ticketNumber = this.dataset.ticket;

                if (ACTIVE_TIMERS[ticketNumber]) {
                    clearInterval(ACTIVE_TIMERS[ticketNumber]);
                }

                ACTIVE_TIMERS[ticketNumber] = startTimer(ticketNumber);

                toggleElementsStateByQuerySelectorAll(`.list-questions.ticket-${ticketNumber}`, STATE.ENABLED);
                toggleElementsStateByQuerySelectorAll(`.submit-btn[data-ticket="${ticketNumber}"]`, STATE.ENABLED);
                toggleElementsStateByQuerySelectorAll('.list-tickets', STATE.DISABLED);
                toggleElementsStateByQuerySelectorAll('.start-btn', STATE.DISABLED);


            });
        });
}

export {
    startSolving,
};
