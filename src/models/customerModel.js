const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    input_first_name : { type: String, required: true, maxLength: 100 },
    input_last_name : { type: String, required: true, maxLength: 100 },
    input_username : { type: String, unique: true, required: true, maxLength: 20 },
    input_email : { type: String, unique: true, required: true, maxLength: 200 },
    input_phone_number : { type: String, unique: true, required: true, maxLength: 20 },
    input_account_number : { type: String, unique: true, required: true, maxLength: 10 },
    input_account_balance : { type: String, unique: true, required: true, maxLength: 200 },
    input_password : { type: String, required: true, maxLength: 6 },
    input_date_created : { type: String }
});

module.exports = mongoose.model('Customer', customerSchema);
