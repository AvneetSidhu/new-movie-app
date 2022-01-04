import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const MoviePage = (props) => {
    const auth = sessionStorage.getItem('token')

    const [movie, setMovie] = useState();
    let { movieID } = useParams();
    useEffect(()=>{
        axios.get("/get-movie-by-id",{headers:{token: auth, id:movieID}})
        .then(data => setMovie(data.data.movie))

    },[])
    
    console.log(movie)

    return (
        <div>
            this is a movie page for {movieID}
        </div>
    )
}


export default MoviePage