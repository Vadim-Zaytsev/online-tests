import {COUNTERS} from '/js/constants.js';
import {getQuestions} from '/js/modules/questions/getQuestions.js';
import {uploadQuestionsToPage} from '/js/modules/tickets/createTicket/uploadQuestionsToPage.js';

function addNewFieldForQuestion() {
    document
        .getElementById('addQuestion')
        .addEventListener('click', async function (event) {
            event.preventDefault();
            COUNTERS.QUESTION_COUNT += 1;
            const newQuestionField = `
            <div class="input-field">
                <select name="question${COUNTERS.QUESTION_COUNT}" class="dropdown-trigger" required>
                    <option value="" disabled selected>Выберите вопрос</option>
                </select>
                <label>Вопрос №${COUNTERS.QUESTION_COUNT}</label>
            </div>
        `;
            document
                .getElementById('questionContainer')
                .insertAdjacentHTML('beforeend', newQuestionField);

            uploadQuestionsToPage(await getQuestions());
        });
}

export {
    addNewFieldForQuestion,
};