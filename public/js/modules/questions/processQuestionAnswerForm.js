import {updateStatistics} from '/js/modules/statistics/updateStatistics.js';
import {ACTIONS} from '/js/constants.js';
import {pointToCorrectAnswer} from '/js/utils.js';

function processQuestionAnswerForm(isAnswerHighlighted) {
    document
        .querySelectorAll('.question-form')
        .forEach(function (form) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();

                const selectedAnswer = form.querySelector('input[name="answer"]:checked');

                if (selectedAnswer) {
                    form
                        .querySelectorAll('input[type="radio"]')
                        .forEach(function (input) {
                            input.disabled = true;
                        });
                    event.submitter.disabled = true;

                    const questionContainer = form.closest('li');
                    const answerIsCorrect = selectedAnswer.dataset.iscorrect === 'true' ? true : false;

                    if (isAnswerHighlighted) {
                        if (answerIsCorrect) {
                            questionContainer
                                .style
                                .boxShadow = '0px 0px 20px #32CD32';
                        } else {
                            questionContainer
                                .style
                                .boxShadow = '0px 0px 20px #CD5C5C';

                            pointToCorrectAnswer(form);
                        }
                    }

                    M.toast({html: 'Ответ принят.', classes: 'green'});

                    updateStatistics(ACTIONS.ANSWER_TO_QUESTION, answerIsCorrect, event.submitter.dataset.csrf);

                } else {
                    M.toast({html: 'Пожалуйста, выберите вариант ответа.', classes: 'red'});
                }
            });
        });
}

export {
    processQuestionAnswerForm,
};