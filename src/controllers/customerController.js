const { registerCustomer } = require('../services/customerService');

const customer = async (req, res, next) => {
    try {
        const { password, c_password } = req.body;
        if (password !== c_password) {
            return res.status(400).json({ error: "Password Mismatch" });
        }

        const newCustomer = await registerCustomer(req.body);
        return res.status(201).json({
            success: "Customer created successfully",
            data: newCustomer
        });

    } catch (err) {
        if (err.status) {
            return res.status(err.status).json(err.errors);
        }
        return next(err);
    }
};

module.exports = {
    customer
};
