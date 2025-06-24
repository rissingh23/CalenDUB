const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    allDay: {
        type: Boolean,
        required: true
    },
    recurring: {
        type: String,
        required: false
    },
    endsOption: {
        type: String,
        required: false
    },
    endsAfterCount: {
        type: Number,
        required: false
    },
    endsOnDate: {
        type: Date,
        required: false
    },
    isInPerson: {
        type: Boolean,
        required: true
    },
    isVirtual: {
        type: Boolean,
        required: true
    },
    isHybrid: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    isRSVPRequired: {
        type: Boolean,
        required: true
    },
    files: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
