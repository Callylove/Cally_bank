const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');

// Function to generate a unique account number
const generateUniqueAccountNumber = async () => {
    let accountNumber;
    let isUnique = false;
    
    while (!isUnique) {
        // Generate 7 random digits (0000000 to 9999999)
        const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
        accountNumber = '301' + randomDigits;
        
        // Check if this account number already exists
        const existingAccount = await Customer.findOne({ input_account_number: accountNumber });
        if (!existingAccount) {
            isUnique = true;
        }
    }
    
    return accountNumber;
};

const registerCustomer = async (data) => {
    const {
        first_name,
        last_name,
        username,
        phone_number,
        email,
        password,
        account_balance
    } = data;

    // Validate account balance: must be greater than N100
    if (typeof account_balance !== 'number' || account_balance <= 100) {
        throw { status: 400, message: 'Opening account balance must be greater than N100' };
    }

    // Validate password: at least 6 alphanumeric characters
    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!passwordRegex.test(password)) {
        throw { status: 400, message: 'Password must be at least 6 alphanumeric characters' };
    }

    // Check for existing customer (excluding account_number since it's auto-generated)
    const existingCustomer = await Customer.findOne({
        $or: [
            { input_username: username },
            { input_email: email },
            { input_phone_number: phone_number }
        ]
    });

    if (existingCustomer) {
        const errors = {};
        if (existingCustomer.input_email === email) errors.email = 'Email already exists';
        if (existingCustomer.input_username === username) errors.username = 'Username already exists';
        if (existingCustomer.input_phone_number === phone_number) errors.phone = 'Phone number already exists';
        throw { status: 400, errors };
    }

    // Generate unique account number
    const account_number = await generateUniqueAccountNumber();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
        input_first_name: first_name.trim(),
        input_last_name: last_name.trim(),
        input_username: username.trim(),
        input_email: email.trim(),
        input_phone_number: phone_number.trim(),
        input_account_number: account_number, 
        input_account_balance: account_balance.trim(), 
        input_date_created: new Date(),
        input_password: hashedPassword
    });

    await newCustomer.save();
    return newCustomer;
};

module.exports = {
    registerCustomer
};