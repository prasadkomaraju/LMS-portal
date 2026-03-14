const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true // in seconds
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  description: String,
  resources: [String] // links/materials
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);

