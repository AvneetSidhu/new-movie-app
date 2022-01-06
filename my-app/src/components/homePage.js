import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/homepage.css'
import '../styles/nav.css'
import Movie from "./movie";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Homepage = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    //on page load, check if authenticated
    const auth = sessionStorage.getItem('token')
    let history = useNavigate()
    useEffect(() => {
        
        setLoading(true)
        //console.log(auth);
        if (!auth) {
            history('/')
        }
        //api key api_key=fbffa47f0e90d6fd133b0d6205b10e22
        axios.get('/pop-movies', { headers: { token: auth } })
            .then((data) => {
                //console.log(data)
                setMovies(data.data.movies);
                setLoading(false)
            }).catch(err => console.log(err))
           
    }, [auth, history])

    //get movies 
    return (
        <div>
        {loading &&     <Box className="box" sx={{ display: 'flex' }}><CircularProgress /></Box>}
        {!loading &&      
            <div>       
            <br />
            <br />
            <div className="movie-container">
                <div className="movies">
                {movies.map((movie) => <Movie key={movie.original_title} movieInfo={movie} />)}
                </div>
            </div>
            
           </div> }

        </div>
    )
}


export default Homepage