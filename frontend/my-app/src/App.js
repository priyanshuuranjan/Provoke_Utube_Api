import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [videoInfo, setVideoInfo] = useState(null);
    const [error, setError] = useState(null);

    const fetchVideoInfo = async () => {
        try {
            const id = videoUrl.split('/').pop();
            setVideoId(id);
            const response = await axios.post('http://localhost:3001/api/getVideoInfo', { videoId: id });
            setVideoInfo(response.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error fetching video information. Please check the video ID and try again.');
        }
    };

    return (
        <div className="App">
            <h1>Video Playback App</h1>
            <label>YouTube Video URL:</label>
            <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            <button onClick={fetchVideoInfo}>Fetch Video Info</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {videoInfo && (
                <div>
                    <h2>{videoInfo.snippet.title}</h2>
                    <p>{videoInfo.snippet.description}</p>
                    <div className="video-container">
                        {/* Add your custom video player component here */}
                        <iframe
                            title="YouTube Video"
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;




// Priyanshu Ranjan
// 12016486
// Role - Full Stack developer
// Submission time -10:30 AM
