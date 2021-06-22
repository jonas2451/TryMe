import React from 'react'
import '../App.css'
import '../components/VideoPlayer.css'

function VideoPlayer() {
    return(
        <div className='player-container'>
            <video src='/assets/videos/video-1.mp4' autoPlay loop muted/>
        </div>
    )
}

export default VideoPlayer