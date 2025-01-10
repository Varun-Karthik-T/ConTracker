const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConfig");
const cors = require("cors");
const Tender = require('./models/Tender');
const mongoose = require('mongoose');
const Contract = require('./models/Contract');
const payment = require('./models/Payment');



const PORT = process.env.PORT || 4000;
const HOST = "192.168.54.15"

app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


app.get('/tenders', async (req, res) => {
    try {
        const tenders = await Tender.find();
        console.log(tenders);
        res.json(tenders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/govcontract', async (req, res) => {
    try {
        const govContract = new payment(req.body);
        await govContract.save();
        res.status(201).json(govContract);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/govcontract/:referenceId', async (req, res) => {
    try {
        const { referenceId } = req.params;
        const govContracts = await payment.find({ referenceId, status: false });
        res.json(govContracts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/contracts', async (req, res) => {
    try {
        const contracts = await Contract.find();
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/payments', async (req, res) => {
    try {
        
        const { id,status } = req.body;
        console.log("status",status);
        console.log("id",id);  
        const booleanStatus = status === 'true' || status === true; // Convert status to boolean
        const updatedPayment = await payment.findByIdAndUpdate(id, { status: booleanStatus }, { new: true });
        return res.json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, HOST,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});