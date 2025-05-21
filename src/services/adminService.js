const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

const registerAdmin = async (data) => {
    const { first_name, last_name, username, phone_number, email, password } = data;

    const existingAdmin = await Admin.findOne({
        $or: [
            { input_username: username },
            { input_email: email },
            { input_phone_number: phone_number }
        ]
    });

    if (existingAdmin) {
        const errors = {};
        if (existingAdmin.input_email === email) errors.email = 'Email already exists';
        if (existingAdmin.input_username === username) errors.username = 'Username already exists';
        if (existingAdmin.input_phone_number === phone_number) errors.phone = 'Phone number already exists';
        throw { status: 400, errors };
    }

    const hash = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
        input_first_name: first_name,
        input_last_name: last_name,
        input_username: username,
        input_email: email,
        input_phone_number: phone_number,
        hash
    });

    await newAdmin.save();
    return newAdmin;
};

module.exports = {
    registerAdmin
};
