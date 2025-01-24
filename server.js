// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const rangeParser = require('range-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/hotstar-clone', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(path.join(__dirname, 'public')));

// Video route to stream
app.get('/video', (req, res) => {
    const filePath = path.join(__dirname, 'public/videos/movie.mp4');
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
        res.status(416).send('Range header required');
        return;
    }

    const ranges = rangeParser(fileSize, range);
    if (ranges === -1) {
        res.status(416).send('Invalid range');
        return;
    }

    const { start, end } = ranges[0];

    res.status(206);
    res.set({
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
    });

    const videoStream = fs.createReadStream(filePath, { start, end });
    videoStream.pipe(res);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
