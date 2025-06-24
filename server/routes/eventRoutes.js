const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/events');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', upload.array('files', 10), async (req, res) => {
  const { title, organizer, start, end, allDay, recurring, endsOption, endsAfterCount, endsOnDate, isInPerson, isVirtual, isHybrid, description, isRSVPRequired } = req.body;  
  
  try {
    const newEvent = new Event({ 
      title, 
      organizer,
      startDate: new Date(start), 
      endDate: new Date(end),
      allDay: allDay === 'true', 
      recurring,
      endsOption,
      endsAfterCount: parseInt(endsAfterCount, 10) || 1,
      endsOnDate: new Date(endsOnDate),
      isInPerson: isInPerson === 'true',
      isVirtual: isVirtual === 'true',
      isHybrid: isHybrid === 'true',
      description,
      isRSVPRequired: isRSVPRequired === 'true',
      files: req.files ? req.files.map(file => `/uploads/events/${file.filename}`) : []
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
