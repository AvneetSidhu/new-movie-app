import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/homepage.css'
import Movie from "./movie";

const Homepage = () => {
    const [movies, setMovies] = useState([])
    //on page load, check if authenticated
    const auth = sessionStorage.getItem('token')
    let history = useNavigate()
    useEffect(() => {
        console.log(auth);
        if (!auth) {
            history('/')
        }
        //api key api_key=fbffa47f0e90d6fd133b0d6205b10e22
        axios.get('/pop-movies', {headers:{token: auth}})
        .then((data) => {
            console.log(data)
            setMovies(data.data.movies);
        }).catch(err => console.log(err))

    },[auth, history])

    //get movies 
    return(
        <div className="movie-container">
           {movies.map((movie) => <Movie key = {movie.original_title} movieInfo = {movie}/>)}
        </div>
    )
}


export default Homepage