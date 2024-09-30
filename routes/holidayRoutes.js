
const express = require('express');
const router = express.Router();
const { addHoliday, getHolidays } = require('../models/holidayModel');


router.post('/', (req, res) => {
    const holiday = req.body;
    
    
    if (!holiday.date || !holiday.month || !holiday.name) {
        return res.status(400).json({ message: 'All fields (date, month, name) are required.' });
    }
    
    addHoliday(holiday, (err, id) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding holiday.', error: err });
        }
        res.status(201).json({ message: 'Holiday added successfully!', holidayId: id });
    });
});


router.get('/', (req, res) => {
    getHolidays((err, holidays) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching holidays.', error: err });
        }
        res.status(200).json(holidays);
    });
});

module.exports = router;
