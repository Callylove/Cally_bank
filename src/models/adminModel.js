const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    input_first_name : { type: String, required: true, maxLength: 100 },
    input_last_name : { type: String, required: true, maxLength: 100 },
    input_username : { type: String, unique: true, required: true, maxLength: 20 },
    input_email : { type: String, unique: true, required: true, maxLength: 200 },
    input_phone_number : { type: String, unique: true, required: true, maxLength: 20 },
    hash : { type: String, required: false, maxLength: 225 },
    time_created : { type: String },
    date_created : { type: String }
});

module.exports = mongoose.model('Admin', adminSchema);
