import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/moviePage.css'

const MoviePage = (props) => {
    const auth = sessionStorage.getItem('token')
    const [poster_path, setPosterPath] = useState('')
    const [rating, setRating] = useState('')
    const [overview, setOverview] = useState('')
    const [title, setTitle] = useState('')
    const [posterFile, setPoster] = useState('')
    const [movie, setMovie] = useState('');
    let { movieID } = useParams();

    useEffect(()=>{
        axios.get("/get-movie-by-id",{headers:{token: auth, id:movieID}})
        .then(data => {
            setPosterPath(`https://image.tmdb.org/t/p/w1280/${data.data.movie.poster_path}`)
            setMovie(data.data.movie)
            setRating(data.data.movie.rating)
            setOverview(data.data.movie.overview)
            setTitle(data.data.movie.title)
        })
    },[auth, movieID])

    function addToWatched(){
        console.log(movie.id)
        console.log(auth)
        axios.post("/add-to-watchlist",{id: movie.id},{headers: {token: auth }})
        .then( data => {
            console.log(data)
        })
    }

    return (
        <div>
            <h2>{title}</h2>
            <h3>{rating}</h3>
            this is a movie page for {movieID}
            <img src={poster_path} alt="couldnt load" />
            <p>{overview}</p>
            <button>Add to Watchlist</button>
            <button onClick={addToWatched}>Add to Watched</button>
        </div>
    )
}


export default MoviePage