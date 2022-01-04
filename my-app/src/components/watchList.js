import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./movie";
import "../styles/watchlist.css"
const Watchlist = () => {
    const [movies, setMovies] = useState([])
    const auth = sessionStorage.getItem('token')

    useEffect(() => {   
        axios.get('/get-watchlist', {headers:{token: auth}})
        .then((data) => {
            setMovies(data.data.movies)
        }).catch(err => console.log(err))
    },[])

    //console.log(movies)

    return(
        <div className="watchlist-container">
            <h1>Your Movies:</h1>
            {movies.map((movie) => <Movie key={movie.info.original_title} movieInfo={movie.info} />)}
        </div>
    )
}

export default Watchlist