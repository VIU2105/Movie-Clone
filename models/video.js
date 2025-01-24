// models/video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    genre: String,
    description: String,
    videoUrl: String,
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
