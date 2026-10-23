import { useState, useRef } from 'react';
import './AudioPlayer.css';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}music-box.mp3`} loop />
      
      <div 
        className={`ballerina-btn ${isPlaying ? 'spin' : ''}`} 
        onClick={toggleMusic}
        title={isPlaying ? "Выключить музыку" : "Включить музыку"}
      >
        <img 
          src={`${import.meta.env.BASE_URL}ballerina.png`} 
          alt="Балерина" 
        />
      </div>
    </div>
  );
}

export default AudioPlayer;