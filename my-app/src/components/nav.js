import React from 'react'
import '../styles/homepage.css'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <h3 className="title"> Movie Site </h3>
            <ul className="nav-links">
                <Link to = "/home">
                        <li>
                             Home
                        </li>
                    </Link>
                    <Link to = "/watchlist">
                        <li>
                            Watchlist
                        </li>
                    </Link>
                    <Link to = "/">
                        <li>
                            Log In 
                        </li>
                    </Link>
                </ul>
        </nav>
    )
}

export default Nav;