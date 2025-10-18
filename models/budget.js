const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const budgetSchema = new Schema({
    title: { type: String, required: true },
    value: { type: Number, required: true },
    color: { 
        type: String, 
        required: true, 
        match: /^#[0-9A-Fa-f]{6}$/ // enforce 6-digit hex
    }
});

const incomeSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    color: { 
        type: String, 
        required: true, 
        match: /^#[0-9A-Fa-f]{6}$/ 
    }
});

const Budget = model('Budget', budgetSchema);
const Income = model('Income', incomeSchema);

module.exports = { Budget, Income };