import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/moviePage.css'
//import Watchlist from "./watchList";
import { useNavigate } from "react-router-dom";
import Movie from "./movie";
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const MoviePage = (props) => {
    const [button, setButton] = useState(false)
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const auth = sessionStorage.getItem('token')
    const [poster_path, setPosterPath] = useState('')
    const [backdrop_path, setBackdropPath] = useState('')
    const [rating, setRating] = useState('')
    const [overview, setOverview] = useState('')
    const [title, setTitle] = useState('')
    //const [posterFile, setPoster] = useState('')
    const [movie, setMovie] = useState('');
    const [watched, setWatched] = useState(false);
    const [releaseYear, setReleaseYear] = useState('')
    let { movieID } = useParams();
    const [similarMovies, setSimilarMovies] = useState([])
    
    useEffect(() => {
        if (!button){
            setLoading(true)
        }
        if (!auth) {
            history('/')
        }
        
        const req1 = axios.get("/get-watchlist", { headers: { token: auth } });
        const req2 = axios.get("/get-movie-by-id", { headers: { token: auth, id: movieID } });
        const req3 = axios.get("/get-similar-movies", { headers: { token: auth, id: movieID } })
        axios.all([req1,req2,req3]).then(axios.spread(function(resWatchlist, resMovie, resSimilar) {
            
            console.log(resWatchlist);
            console.log(resMovie);
            console.log(resSimilar);

            setPosterPath(`https://image.tmdb.org/t/p/w1280/${resMovie.data.movie.poster_path}`)
            setBackdropPath(`https://image.tmdb.org/t/p/w1280/${resMovie.data.movie.backdrop_path}`)
            setMovie(resMovie.data.movie)
            setRating(resMovie.data.movie.vote_average)
            setOverview(resMovie.data.movie.overview)
            setTitle(resMovie.data.movie.title)
            setReleaseYear(resMovie.data.movie.release_date.split('-')[0])
            const target = resMovie.data.movie
            const list = resWatchlist.data.movies
            let watchedFlag = false

            list.forEach(item => {
                if (item.info.id === target.id) {
                    watchedFlag = true
                }
            })

            if(watchedFlag) {
                setWatched(true)
            }
            else {
                setWatched(false)
            }
            

            setSimilarMovies(resSimilar.data.movies.splice(0,4))
            setLoading(false)
          })).catch (err => {
              console.log(err)
              history('/')
          })
         
         
    }, [auth, movieID, watched, history])
   
    //console.log(movie)
  
    function addToWatched() {
        axios.post("/add-to-watchlist", { movie: movie }, { headers: { token: auth } })
            .then(data => {
                console.log(data)
                setButton(true)
                setWatched(true)
                //window.location.reload(false)

            })
    }

    function removeFromWatched() {
        axios.post("/remove-from-watchlist", { movie: movie }, { headers: { token: auth } })
            .then(data => {
                console.log(data)
                setButton(true)
                setWatched(false)

                //window.location.reload(false)
            })
    }

    return (
        <div>
        {loading && !button &&  <Box className="box" sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
        {!loading && <div>
            <div className="movie-page-container" style={{
                backgroundImage: `url(${backdrop_path})`,
                backgroundPosition: 'right',
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat',

            }}>
                <div className="movie-details-container">

                    <div className="text-container">
                        <div className="empty"></div>
                    </div>

                    <div className="poster-container">
                        
                            <img className="poster" src={poster_path} alt="couldnt load" />
                        
                    </div>

                    <div className="text-container">
                        <div className="empty"></div>
                    </div>

                    <div className="text-container" id="description">
                        
                        <h2>{title + " (" + releaseYear + ")"}</h2>
                        <div className="empty"></div>
                        <br/>
                        <h3>Rating: {rating}</h3>
                        <br/>
                        <p className="description">{overview}</p>
                        <div className="empty"></div>
                        <div className="empty"></div>
                        
                        <br/><br/>
                        {!watched && <Button variant="contained" onClick={addToWatched}>Add to Watchlist</Button>}
                        {watched && <Button id="removeButton"  variant="contained" onClick={removeFromWatched}>Remove from Watchlist</Button>}
                    </div>

                    <div className="text-container">
                        <div className="empty"></div>
                    </div>

                    <div class="square"></div>

                </div>

            </div>
            <br/>
            <h1>You may also like:</h1>
            <div className="similar-movies">
        
                <div className="similar-movies-container">
                    
                    {similarMovies.map((movie) => <Movie key={movie.original_title} movieInfo={movie} />)}
                </div>
            </div>

        </div>}
        </div>
    )
}


export default MoviePage