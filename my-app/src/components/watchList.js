import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Movie from "./movie";
import "../styles/watchlist.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Watchlist = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const auth = sessionStorage.getItem('token')
    let history = useNavigate()

    useEffect(() => {   
        //console.log(auth);
        setLoading(true)
        if (!auth) {
            history('/')
        }

        axios.get('/get-watchlist', {headers:{token: auth}})
        .then((data) => {
            setMovies(data.data.movies)
            setLoading(false)
        }).catch(err => console.log(err))
    }, [auth, history])

    //console.log(movies)
    return(
        <div>
            { loading && <Box className="box" sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
            {!loading && <div>

                <br />
                {movies.length > 0 && <h1>Your Watchlist</h1>}
                {movies.length === 0 && <h1>You have no saved Movies! Try adding some. </h1>}
                <br />
                <div className="watchlist-container">
                    { movies.map((movie) => <Movie key={movie.info.original_title} movieInfo={movie.info} />)}
                </div>
            </div>}
        </div >
    )
}

export default Watchlist