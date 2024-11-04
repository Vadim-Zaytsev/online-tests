import {getDataOnQuestionsAndAnswers} from '/js/modules/questions/getDataOnQuestionsAndAnswers.js';
import {COUNTERS} from '/js/constants.js';

function processQuestionCreationForm(additionalAnswersContainer) {
    const form = document.getElementById('questionForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const {question, answers} = getDataOnQuestionsAndAnswers();

        try {
            const response = await fetch('/questions/create-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question,
                    answers,
                    _csrf: event.submitter.dataset.csrf
                })
            });

            const data = await response.json();

            if (response.ok) {
                M.toast({html: data.message, classes: 'green'});

                form.reset();
                form
                    .querySelector('#additionalAnswers')
                    .innerHTML = JSON.parse(additionalAnswersContainer);

                COUNTERS.ADDITIONAL_ANSWER_COUNT = 1;
            } else {
                M.toast({html: data.message, classes: 'red'});
            }
        } catch (error) {
            M.toast({html: 'Error sending data', classes: 'red'});
            console.error('Error:', error);
        }
    });
}

export {
    processQuestionCreationForm,
};