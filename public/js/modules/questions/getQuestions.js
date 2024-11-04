async function getQuestions() {
    const cachedQuestions = localStorage.getItem('questions');
    if (cachedQuestions && cachedQuestions !== 'undefined') {
        const questions = JSON.parse(cachedQuestions);

        return questions;
    } else {
        try {
            const response = await fetch('/questions/list');
            const questions = await response.json();
            localStorage.setItem('questions', JSON.stringify(questions));

            return questions;
        } catch (error) {
            console.error('Ошибка загрузки вопросов:', error);
        }
    }
}

export {
    getQuestions,
};