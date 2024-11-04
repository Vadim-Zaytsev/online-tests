function shuffleAnswer(arrAnswer) {
    for (let i = arrAnswer.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrAnswer[i], arrAnswer[j]] = [arrAnswer[j], arrAnswer[i]];
    }

    return arrAnswer;
}

module.exports = {
    shuffleAnswer,
};