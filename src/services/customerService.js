const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');

const registerCustomer = async (data) => {
    const {
        first_name,
        last_name,
        username,
        phone_number,
        email,
        password,
        account_number,
        account_balance
    } = data;

    // Validate account number format: 10 digits starting with 301
    const accountNumberRegex = /^301\d{7}$/;
    if (!accountNumberRegex.test(account_number)) {
        throw { status: 400, message: 'Account number must be 10 digits and start with 301' };
    }

    // Validate account balance: must be greater than N100
    if (typeof account_balance !== 'number' || account_balance <= 100) {
        throw { status: 400, message: 'Opening account balance must be greater than N100' };
    }

    // Validate password: at least 6 alphanumeric characters
    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!passwordRegex.test(password)) {
        throw { status: 400, message: 'Password must be at least 6 alphanumeric characters' };
    }

    const existingCustomer = await Customer.findOne({
        $or: [
            { input_username: username },
            { input_email: email },
            { input_phone_number: phone_number },
            { input_account_number: account_number }
        ]
    });

    if (existingCustomer) {
        const errors = {};
        if (existingCustomer.input_email === email) errors.email = 'Email already exists';
        if (existingCustomer.input_username === username) errors.username = 'Username already exists';
        if (existingCustomer.input_phone_number === phone_number) errors.phone = 'Phone number already exists';
        if (existingCustomer.input_account_number === account_number) errors.account_number = 'Account number already exists';
        throw { status: 400, errors };
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newCustomer = new Customer({
        input_first_name: first_name,
        input_last_name: last_name,
        input_username: username,
        input_email: email,
        input_phone_number: phone_number,
        input_account_number: account_number,
        input_account_balance: account_balance,
        input_date_created:  new Date(),
        input_password: hashedPassword
    });

    await newCustomer.save();
    return newCustomer;
};

module.exports = {
    registerCustomer
};
