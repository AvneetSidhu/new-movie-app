import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./movie";

const Watchlist = () => {
    const [movies, setMovies] = useState([])
    const auth = sessionStorage.getItem('token')

    useEffect(() => {   
        axios.get('/get-watchlist', {headers:{token: auth}})
        .then((data) => {
            setMovies(data.data.movies)
        }).catch(err => console.log(err))
    },[])



    return(
        <div>
            {movies.map((movie) => <Movie key={movie.original_title} movieInfo={movie} />)}
        </div>
    )
}

export default Watchlist