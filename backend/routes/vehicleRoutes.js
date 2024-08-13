const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Create a new vehicle
router.post('/', async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
