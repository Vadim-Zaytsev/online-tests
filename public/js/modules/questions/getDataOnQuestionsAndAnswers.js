function getDataOnQuestionsAndAnswers() {
    const question = document.getElementById('question').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const additionalAnswers = Array.from(document.querySelectorAll('input[name="additionalAnswer[]"]'))
        .map(input => input.value);

    const answers = [
        {answer: correctAnswer, isCorrect: true},
        ...additionalAnswers.map(answer => ({answer, isCorrect: false}))
    ];

    return {
        question,
        answers
    }
}

export {
    getDataOnQuestionsAndAnswers,
}