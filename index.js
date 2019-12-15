const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore();
const apikey = process.env.APIKEY;

const cardsGET = (req, res) => {
    res.status(404).end();
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