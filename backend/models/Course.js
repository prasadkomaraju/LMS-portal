const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  thumbnail: String,
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  duration: Number, // total minutes
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  price: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);

