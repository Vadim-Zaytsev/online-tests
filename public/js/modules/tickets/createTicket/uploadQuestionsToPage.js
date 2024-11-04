function uploadQuestionsToPage(questions) {
    const questionOptions = questions
        .map(q => `<option value="${q._id}">${q.questionNumber}. ${q.question}</option>`)
        .join('');
    document
        .querySelectorAll('select')
        .forEach(select => {
            select.length === 1 ? select.innerHTML += questionOptions : -1;
            M.FormSelect.init(select);
        });
}

export {
    uploadQuestionsToPage,
}