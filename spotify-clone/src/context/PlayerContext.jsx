import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const url = 'http://localhost:4000';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumData] = useState([]);
    const [track, setTrack] = useState(null); // Initializing as null
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        const selectedTrack = songsData.find((item) => item._id === id);
        if (selectedTrack) {
            setTrack(selectedTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const previous = async () => {
        const currentIndex = songsData.findIndex((item) => item._id === track._id);
        if (currentIndex > 0) {
            const previousTrack = songsData[currentIndex - 1];
            setTrack(previousTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        const currentIndex = songsData.findIndex((item) => item._id === track._id);
        if (currentIndex < songsData.length - 1) {
            const nextTrack = songsData[currentIndex + 1];
            setTrack(nextTrack);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = (e) => {
        const seekTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]); // Set the first song as the default track
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumData(response.data.albums);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;

        const updateTime = () => {
            const currentTime = Math.floor(audioRef.current.currentTime);
            const duration = Math.floor(audioRef.current.duration);
            setTime({
                currentTime: {
                    second: currentTime % 60,
                    minute: Math.floor(currentTime / 60),
                },
                totalTime: {
                    second: duration % 60,
                    minute: Math.floor(duration / 60),
                },
            });

            seekBar.current.style.width = `${(currentTime / duration) * 100}%`;
        };

        audioRef.current.ontimeupdate = updateTime;

        return () => {
            audioRef.current.ontimeupdate = null;
        };
    }, [track]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData, albumsData,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
