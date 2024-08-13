const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Create a new assignment
router.post('/', async (req, res) => {
    const { driver, vehicle, startTime, endTime } = req.body;
    try {
        const existingAssignments = await Assignment.find({
            driver,
            $or: [
                { startTime: { $lte: endTime }, endTime: { $gte: startTime } }
            ]
        });
        if (existingAssignments.length > 0) {
            return res.status(400).json({ message: 'Conflict with existing assignments' });
        }
        const newAssignment = new Assignment({ driver, vehicle, startTime, endTime });
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
