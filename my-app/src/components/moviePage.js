import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/moviePage.css'
import Watchlist from "./watchList";
import { useNavigate } from "react-router-dom";

const MoviePage = (props) => {
    const history = useNavigate();
    const auth = sessionStorage.getItem('token')
    const [poster_path, setPosterPath] = useState('')
    const [rating, setRating] = useState('')
    const [overview, setOverview] = useState('')
    const [title, setTitle] = useState('')
    const [posterFile, setPoster] = useState('')
    const [movie, setMovie] = useState('');
    const [watched, setWatched] = useState(false);
    let { movieID } = useParams();

    useEffect(()=>{
        if (!auth){
            history('/')
        }
         axios.get("/get-movie-by-id",{headers:{token: auth, id:movieID}})
        .then(data => {
            
            setPosterPath(`https://image.tmdb.org/t/p/w1280/${data.data.movie.poster_path}`)
            setMovie(data.data.movie)
            setRating(data.data.movie.rating)
            setOverview(data.data.movie.overview)
            setTitle(data.data.movie.title)
            axios.get('/get-watchlist', {headers:{token: auth}})
            .then((res) => {
                //console.log(res.data.movies)
                const target = data.data.movie
                const list = res.data.movies
                list.forEach(item => {
                    if (item.info.id == target.id){
                        setWatched(true)
                    }
                })
            })
        }). catch(err => {
            console.log(err)
                history('/')
        })

    },[auth, movieID,watched])

    console.log(movieID)


    function addToWatched(){
        axios.post("/add-to-watchlist",{movie: movie},{headers: {token: auth }})
        .then( data => {
            console.log(data)
            setWatched(true)
            //window.location.reload(false)
        })
    }

    function removeFromWatched (){
        axios.post("/remove-from-watchlist",{movie: movie},{headers: {token: auth }})
        .then( data => {
            console.log(data)
            setWatched(false)
            //window.location.reload(false)
        })
    }

    return (
        <div>
            <h2>{title}</h2>
            <h3>{rating}</h3>
            this is a movie page for {movieID}
            <img src={poster_path} alt="couldnt load" />
            <p>{overview}</p>
            
            {!watched && <button onClick={addToWatched}>Add to Watchlist</button>}
            {watched &&<button onClick={removeFromWatched}>Remove from Watchlist</button>}
        </div>
    )
}


export default MoviePage