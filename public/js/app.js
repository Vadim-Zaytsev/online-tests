import {addNewFieldForAdditionalAnswer} from '/js/modules/questions/addNewFieldForAdditionalAnswer.js';
import {processQuestionCreationForm} from '/js/modules/questions/processQuestionCreationForm.js';
import {addNewFieldForQuestion} from '/js/modules/tickets/createTicket/addNewFieldForQuestion.js';
import {getQuestions} from '/js/modules/questions/getQuestions.js';
import {uploadQuestionsToPage} from '/js/modules/tickets/createTicket/uploadQuestionsToPage.js';
import {processTicketCreationForm} from '/js/modules/tickets/createTicket/processTicketsCreationForm.js';
import {processQuestionAnswerForm} from '/js/modules/questions/processQuestionAnswerForm.js';
import {
    toggleElementsStateByQuerySelectorAll,
    setLifetimeFlashMessages,
} from '/js/utils.js';
import {STATE} from '/js/constants.js';
import {startSolving} from '/js/modules/tickets/solutionTicket/startSolving.js';
import {submitTicketForVerification} from '/js/modules/tickets/solutionTicket/submitTicketForVerification.js';
import Handlers from './modules/admin-panel/creating-editing-tests/safe-handling-of-weapons/handlers.js';

document.addEventListener('DOMContentLoaded', async function () {
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('questions');
    });

    if (window.location.pathname === '/auth') {
        setLifetimeFlashMessages(5000);
    } else if (window.location.pathname === '/tickets/create-ticket') {
        const questionContainer = JSON.stringify(document
            .getElementById('questionContainer')
            .innerHTML);

        uploadQuestionsToPage(await getQuestions());
        addNewFieldForQuestion();
        processTicketCreationForm(questionContainer);
    } else if (window.location.pathname === '/questions') {
        processQuestionAnswerForm(true);
    } else if (window.location.pathname === '/tickets') {
        toggleElementsStateByQuerySelectorAll('.list-questions', STATE.DISABLED);
        toggleElementsStateByQuerySelectorAll('.submit-btn', STATE.DISABLED);
        startSolving();
        processQuestionAnswerForm(false);
        submitTicketForVerification();
    } else if (window.location.pathname === '/admin-panel') {
        const additionalAnswersContainer = JSON.stringify(document
            .getElementById('additionalAnswers')
            .innerHTML);

        addNewFieldForAdditionalAnswer();
        processQuestionCreationForm(additionalAnswersContainer);

    } else if (window.location.pathname === '/admin-panel/safe-handling-of-weapons/create-question') {
        const additionalAnswersContainer = JSON.stringify(document
            .getElementById('additionalAnswers')
            .innerHTML);

        addNewFieldForAdditionalAnswer();
        processQuestionCreationForm(additionalAnswersContainer);

    }
});


