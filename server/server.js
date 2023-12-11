const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS
app.use(express.json());

app.post('/api/getVideoInfo', async (req, res) => {
  try {
      const videoId = req.body.videoId;
      const apiKey = 'YOUR_YOUTUBE_API_KEY';

      if (!videoId) {
          return res.status(400).json({ error: 'Missing videoId in the request body.' });
      }

      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${apiKey}`);
      const videoInfo = response.data.items[0];

      if (!videoInfo) {
          return res.status(404).json({ error: 'Video not found.' });
      }

      res.json(videoInfo);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




//AIzaSyBwz1cqSFGya6lNsTPI16xQocg