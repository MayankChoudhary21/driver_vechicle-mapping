const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Create a new request
router.post('/', async (req, res) => {
    try {
        const newRequest = new Request(req.body);
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update request status
router.patch('/:id', async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        request.status = req.body.status;
        await request.save();
        res.json(request);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
