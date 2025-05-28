const express = require('express');
const path = require('path');
const adminRoutes = require('./src/routes/adminRoute');
const customerRoutes = require('./src/routes/customerRoute');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..')));

app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes)
module.exports = app;
