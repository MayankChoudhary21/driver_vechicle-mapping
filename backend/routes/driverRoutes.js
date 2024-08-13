const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

// Create a new driver
router.post('/', async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.status(201).json(driver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all drivers
router.get('/', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Search drivers by name or phone
router.get('/search', async (req, res) => {
    try {
        const { name, phone } = req.query;
        const query = {};
        if (name) query.name = new RegExp(name, 'i');
        if (phone) query.phone = phone;
        const drivers = await Driver.find(query);
        res.json(drivers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
