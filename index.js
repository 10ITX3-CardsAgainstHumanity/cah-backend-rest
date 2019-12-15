const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore();
const apikey = process.env.APIKEY;

const cardsGET = async (req, res) => {
    try {
        let resData = [];
        const answers = await firestore.collection('answers').get();
        const questions = await firestore.collection('questions').get();
        answers.forEach((item) => {
            let data = item.data();
            data.type = 'answer';
            resData = [ ...resData, data ];
        });
        questions.forEach((item) => {
            let data = item.data();
            data.type = 'question';
            resData = [ ...resData, data ];
        });
        res.status(200).json(resData);
    } catch (err) {
        res.status(500).send(err);
    }

};

const cardsPOST = (req, res) => {
    res.status(404).end();
};

const cardsPUT = (req, res) => {
    res.status(404).end();
};

const cardsDELETE = (req, res) => {
    res.status(404).end();
};

exports.cardsController = (req, res) => {
    if (req.header('Apikey') !== apikey) {
        res.status(401).end();
    }

    switch (req.method) {
        case 'GET':
            cardsGET(req, res);
            break;
        case 'POST':
            cardsPOST(req, res);
            break;
        case 'PUT':
            cardsPUT(req, res);
            break;
        case 'DELETE':
            cardsDELETE(req, res);
            break;
        default:
            res.status(405).end();
            break;
    }
};