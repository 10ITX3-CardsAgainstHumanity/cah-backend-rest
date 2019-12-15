const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore();

(async () => {
    let res = [];
    const answers = await firestore.collection('answers').get();
    const questions = await firestore.collection('questions').get();
    answers.forEach((item) => {
        let data = item.data();
        data.type = 'answer';
        res = [ ...res, data ];
    });
    questions.forEach((item) => {
        let data = item.data();
        data.type = 'question';
        res = [ ...res, data ];
    });
})();