const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
 
const uri = "mongodb+srv://Rishi:9XUfdL7eFXlb8aku@contracker.ajeao.mongodb.net/?retryWrites=true&w=majority&appName=Contracker";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectToDatabase();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});