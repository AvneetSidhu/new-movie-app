import React from "react";
import '../styles/movie.css'
import { Link } from "react-router-dom";

const Movie = (props) => {
    const movie = props.movieInfo
    const title = movie.title
    const poster_path = movie.poster_path
    const posterFile = `https://image.tmdb.org/t/p/w1280/${poster_path}`
    const rating = (Math.round(movie.vote_average * 10) / 10).toFixed(1);
    const overview = movie.overview;
    const id = movie.id
    return (
        
        <div className="movie">
            <Link to={{pathname: `/movie/${id}`}}>
            <img src={posterFile} alt = "didnt load"/>
            </Link>
            <div className="movie-info">
                <h3>{title}</h3>
                <span>{rating}</span>
            </div>
            <Link to={{ pathname: `/movie/${id}` }}>
            <div  className="movie-over">
                <h2>Overview:</h2>
                <p>{overview}</p>
            </div>
            </Link>
        </div>
      
    )
}

export default Movie