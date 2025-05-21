const express = require('express');
const path = require('path');
const adminRoutes = require('./src/routes/adminRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..')));

app.use('/admin', adminRoutes);

module.exports = app;
