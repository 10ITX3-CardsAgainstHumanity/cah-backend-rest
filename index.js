const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore();
const apikey = process.env.APIKEY;

const cardsGET = async (req, res) => {
    let resData = [];
    const answers = await firestore.collection('answers').get();
    const questions = await firestore.collection('questions').get();
    answers.forEach((item) => {
        let data = item.data();
        data.id = item.id;
        data.type = 'answer';
        resData = [ ...resData, data ];
    });
    questions.forEach((item) => {
        let data = item.data();
        data.id = item.id;
        data.type = 'question';
        resData = [ ...resData, data ];
    });
    res.status(200).json(resData);
};

const cardsPOST = async (req, res) => {
    if (!req.body.type || !req.body.text)
        res.status(400).end();

    const card = {
        text: req.body.text
    };

    switch (req.body.type) {
        case 'answer':
            await firestore.collection('answers').doc().set(card);
            res.status(201).json(card);
            break;
        case 'question':
            await firestore.collection('questions').doc().set(card);
            res.status(201).json(card);
            break;
        default:
            res.status(404).end();
    }
};

const cardsPUT = async (req, res) => {
    if (!req.body.id || !req.body.text)
        res.status(400).end();

    const card = {
        text: req.body.text
    };

    await firestore.collection('answers').doc(req.body.id).set(card);
    await firestore.collection('questions').doc(req.body.id).set(card);
    res.status(200).json(card);
};

const cardsDELETE = async (req, res) => {
    if (!req.body.id)
        res.status(400).end();

    await firestore.collection('answers').doc(req.body.id).delete();
    await firestore.collection('questions').doc(req.body.id).delete();
    res.status(200).json({ id: req.body.id });
};

exports.cardsController = (req, res) => {
    try {
        if (req.header('X-Apikey') !== apikey)
            res.status(401).end();
    
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
    } catch (err) {
        res.status(500).send(err);
    }
};