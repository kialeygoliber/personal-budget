
const express = require('express');
const cors = require('cors');


const mongoose = require('mongoose');
const { Budget, Income } = require('./models/budget'); 

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/personalBudget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('MongoDB connection error:', err));





app.get('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.get('/budget', async (req, res) => {
    try {
        const myBudget = await Budget.find();
        const income = await Income.find();
        res.json({ myBudget, income });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/budget', async (req, res) => {
    try {
        const { title, value, color } = req.body;
        const newItem = new Budget({ title, value, color });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/income', async (req, res) => {
    try {
        const { title, amount, color } = req.body;
        const newIncome = new Income({ title, amount, color });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});

