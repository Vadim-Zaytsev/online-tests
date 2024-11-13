const mongoose = require('mongoose');

function shuffleAnswer(arrAnswer) {
    for (let i = arrAnswer.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrAnswer[i], arrAnswer[j]] = [arrAnswer[j], arrAnswer[i]];
    }

    return arrAnswer;
}

function migrateDataToAtlas(nameCollection) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            return mongoose.connection.db.collection(nameCollection).find({}).toArray();
        })
        .then(data => {
            mongoose.disconnect();
            mongoose.connect(process.env.MONGO_URI_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    const atlasCollection = mongoose.connection.db.collection(nameCollection);
                    return atlasCollection.insertMany(data);
                })
                .then(() => {
                    console.log('Данные успешно перенесены в Atlas!');
                    mongoose.disconnect();
                });
        })
        .catch(err => {
            console.error('Ошибка:', err);
        });
}

module.exports = {
    shuffleAnswer,
    migrateDataToAtlas,
};