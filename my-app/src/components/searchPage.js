import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/searchpage.css'
import '../styles/nav.css'
import Movie from "./movie";
import Button from "@mui/material/Button"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Search = () => {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState([])
    const [searched, setSearched] = useState(false)
    const auth = sessionStorage.getItem('token')
    const history = useNavigate()


    useEffect(() => {
        setLoading(true)

        if (!auth) {
            history('/')
        }

        setLoading(false)
        // axios.get('/get-search-results', { headers: { token: auth, query: query }})
        //     .then((data) => {
        //         setMovies(data.data.movies);
        //         setLoading(false)
        //     }).catch(err => console.log(err))

    }, [auth, history])

    const search = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.get('/get-search-results', { headers: { token: auth, query: query } })
        .then((data) => {
            setMovies(data.data.movies);
            setSearched(true)
            setLoading(false)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            {loading && <Box className="box" sx={{ display: 'flex' }}><CircularProgress /></Box>}
            {!loading &&
                <div>
                    <form className="searchbar">
                        <input onChange={(e) => setQuery(e.target.value)} type="text" id="query" placeholder="Search for a movie"></input>
                        <Button variant="contained" type="submit" onClick={search}>Search</Button>
                    </form>
                    <br />
                    <div className="movie-container">
                        <div className="movies">
                            {movies.map((movie) => <Movie key={movie.original_title} movieInfo={movie} />)}
                            {movies.length===0 && searched && <div className="text">No results available.</div>}
                        </div>
                    </div>

                </div>}

        </div>
    )
}

export default Search