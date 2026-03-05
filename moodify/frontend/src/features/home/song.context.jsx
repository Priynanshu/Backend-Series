import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [ song, setSong ] = useState({
        "url": "https://ik.imagekit.io/a3d4qfkiw/backend/moodify/songs/Calamity_eEL56Nc2e.mp3",
        "posterUrl": "https://ik.imagekit.io/a3d4qfkiw/backend/moodify/posters/Calamity_RIS7uGi7R.jpeg",
        "title": "Calamity",
        "mood": "happy",
    })

    const [ loading, setLoading ] = useState(false)

    return (
        <SongContext.Provider
            value={{ loading, setLoading, song, setSong }}
        >
            {children}
        </SongContext.Provider>
    )

}