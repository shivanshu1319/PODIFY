import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
    const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong, audioRef, songsData } = useContext(PlayerContext);

    const [volume, setVolume] = useState(1); // Default volume to 100%
    const [isShuffle, setIsShuffle] = useState(false); // Shuffle state
    const [isLoop, setIsLoop] = useState(false); // Loop state

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume; // Adjust the volume of the audio element
    };

    const handleShuffle = () => {
        setIsShuffle(!isShuffle); // Toggle shuffle
        if (!isShuffle) {
            playRandomSong(); // Play random song when shuffle is enabled
        }
    };

    const handleLoop = () => {
        setIsLoop(!isLoop); // Toggle loop
        audioRef.current.loop = !audioRef.current.loop; // Enable/Disable loop on the audio element
    };

    const playRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * songsData.length);
        const randomSong = songsData[randomIndex];
        setTrack(randomSong);
        audioRef.current.play();
        setPlayStatus(true);
    };

    return track ? (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden lg:flex items-center gap-4'>
                <img className='w-12' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img 
                        onClick={handleShuffle} 
                        className={`w-4 cursor-pointer ${isShuffle ? 'text-blue-500' : ''}`} 
                        src={assets.shuffle_icon} alt="Shuffle" 
                    />
                    <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="Previous" />
                    {playStatus
                        ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="Pause" />
                        : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="Play" />
                    }
                    <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="Next" />
                    <img 
                        onClick={handleLoop} 
                        className={`w-4 cursor-pointer ${isLoop ? 'text-blue-500' : ''}`} 
                        src={assets.loop_icon} alt="Loop" 
                    />
                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                {/* <img className='w-4' src={assets.plays_icon} alt="Play" />
                <img className='w-4' src={assets.mic_icon} alt="Microphone" />
                <img className='w-4' src={assets.queue_icon} alt="Queue" />
                <img className='w-4' src={assets.speaker_icon} alt="Speaker" /> */}
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    className="w-20" 
                />
                <img className='w-4' src={assets.mini_player_icon} alt="Mini Player" />
                <img className='w-4' src={assets.zoom_icon} alt="Zoom" />
            </div>
        </div>
    ) : null;
};

export default Player;
