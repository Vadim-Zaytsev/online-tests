import {COUNTERS} from '/js/constants.js';
import {uploadQuestionsToPage} from '/js/modules/tickets/createTicket/uploadQuestionsToPage.js';
import {getQuestions} from '/js/modules/questions/getQuestions.js';

function processTicketCreationForm(questionContainer) {
    const form = document.getElementById('ticketForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const questions = Array.from(document.querySelectorAll('select')).map(select => select.value);
        try {
            const response = await fetch('/tickets/create-ticket', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    questions,
                    _csrf: event.submitter.dataset.csrf
                })
            });
            if (response.ok) {
                M.toast({html: 'Билет успешно создан!', classes: 'green'});

                form.reset();
                form
                    .querySelector('#questionContainer')
                    .innerHTML = JSON.parse(questionContainer);

                COUNTERS.QUESTION_COUNT = 3;

                uploadQuestionsToPage(await getQuestions());
            } else {
                M.toast({html: 'Ошибка создания билета', classes: 'red'});
            }
        } catch (error) {
            M.toast({html: 'Ошибка создания билета', classes: 'red'});
            console.error('Ошибка:', error);
        }
    });
}

export {
    processTicketCreationForm,
};