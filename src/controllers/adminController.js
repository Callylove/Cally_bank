const { registerAdmin } = require('../services/adminService');

const register = async (req, res, next) => {
    try {
        const { password, c_password } = req.body;
        if (password !== c_password) {
            return res.status(400).json({ error: "Password Mismatch" });
        }

        const newAdmin = await registerAdmin(req.body);
        return res.status(201).json({
            success: "Registration successful",
            data: newAdmin
        });

    } catch (err) {
        if (err.status) {
            return res.status(err.status).json(err.errors);
        }
        return next(err);
    }
};

module.exports = {
    register
};
