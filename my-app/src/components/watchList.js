import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Movie from "./movie";
import "../styles/watchlist.css"

const Watchlist = () => {
    const [movies, setMovies] = useState([])
    const auth = sessionStorage.getItem('token')
    let history = useNavigate()

    useEffect(() => {   
        //console.log(auth);
        if (!auth) {
            history('/')
        }

        axios.get('/get-watchlist', {headers:{token: auth}})
        .then((data) => {
            setMovies(data.data.movies)
        }).catch(err => console.log(err))
    }, [auth, history])

    //console.log(movies)

    return(
        <div>
            <br />
            <h1>Your Watchlist</h1>
            <br />
            <div className="watchlist-container">
                {movies.map((movie) => <Movie key={movie.info.original_title} movieInfo={movie.info} />)}
            </div>
        </div>
    )
}

export default Watchlist