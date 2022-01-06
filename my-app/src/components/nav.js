import React from 'react'
import '../styles/homepage.css'
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button"
function Nav() {
    return (
        <nav>
            <h3 className="title"> FilmR </h3>
            <ul className="nav-links">
                <Link to = "/home">
                        <li>
                        <Button id="buttons"variant ="text">Home</Button>
                        </li>
                    </Link>
                    <Link to = "/watchlist">
                        <li>
                            <Button id="buttons" variant ="text">WatchList</Button>
                        </li>
                    </Link>
                    <Link to = "/"> 
                        <li>
                        <Button id="buttons" variant ="text">Log Out</Button>
                        </li>
                    </Link>
                </ul>
        </nav>
    )
}

export default Nav;