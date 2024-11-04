import {ACTIVE_TIMERS} from '/js/constants.js';
import {toggleElementsStateByQuerySelectorAll} from '/js/utils.js';
import {STATE} from '/js/constants.js';
import {updateStatistics} from '/js/modules/statistics/updateStatistics.js';
import {ACTIONS} from '/js/constants.js';

function submitTicketForVerification() {
    document
        .getElementById('submitTicket')
        .addEventListener('click', function () {
            this.disabled = true;

            const ticketNumber = this.dataset.ticket;

            if (ACTIVE_TIMERS[ticketNumber]) {
                clearInterval(ACTIVE_TIMERS[ticketNumber]);
            }

            const answersList =document.querySelectorAll(`.list-questions.ticket-${ticketNumber} input[name="answer"]:checked`);

            if (answersList.length >= 2) {
                let countErrors = 0;

                answersList.forEach((answer) => {

                    if (answer.dataset.iscorrect === 'false') {
                        countErrors += 1;

                        answer
                            .closest('li')
                            .style
                            .boxShadow = '0px 0px 20px #CD5C5C';

                        answer
                            .closest('form')
                            .querySelector('input[name="answer"][data-iscorrect="true"]')
                            .nextElementSibling
                            .innerHTML += ' <em>(правильный ответ)</em>';
                    } else if (answer.dataset.iscorrect === 'true') {
                        answer
                            .closest('li')
                            .style
                            .boxShadow = '0px 0px 20px #32CD32';
                    }

                })

                if (countErrors >= 2) {
                    M.toast({html: 'Вы привысили максимальное количество ошибок. Билет не сдан.'});

                    document
                        .querySelector('.list-tickets.active')
                        .style
                        .boxShadow = '0px 0px 20px #CD5C5C';

                    updateStatistics(ACTIONS.TICKET_SOLUTION, false, this.dataset.csrf);
                } else if (countErrors < 2) {
                    document
                        .querySelector('.list-tickets.active')
                        .style
                        .boxShadow = '0px 0px 20px #32CD32';

                    updateStatistics(ACTIONS.TICKET_SOLUTION, true, this.dataset.csrf);
                }

                toggleElementsStateByQuerySelectorAll('.list-tickets', STATE.ENABLED);
            } else {
                M.toast({html: 'Для отправки билета на проверку Вам необходимо ответить на все вопросы.'});

                return;
            }
        });
}

export {
    submitTicketForVerification,
}