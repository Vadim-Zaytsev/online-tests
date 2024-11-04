import {COUNTERS} from '/js/constants.js';

function addNewFieldForAdditionalAnswer() {
    document.getElementById('addAnswer').addEventListener('click', function () {
        COUNTERS.ADDITIONAL_ANSWER_COUNT += 1;

        const newAnswerField = `
                    <div class="input-field">
                        <input 
                            id="additionalAnswer${COUNTERS.ADDITIONAL_ANSWER_COUNT}" 
                            type="text" 
                            name="additionalAnswer[]"
                            class="validate" 
                            required>
                        <label for="additionalAnswer${COUNTERS.ADDITIONAL_ANSWER_COUNT}">
                            Дополнительный ответ ${COUNTERS.ADDITIONAL_ANSWER_COUNT}
                        </label>
                    </div>
                `;
        document
            .getElementById('additionalAnswers')
            .insertAdjacentHTML('beforeend', newAnswerField);
    });
}

export {
    addNewFieldForAdditionalAnswer,
};