import React from "react"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import '../styles/homepage.css'
import '../styles/landingpage.css'
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
const Landing = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('token')
    }, [])

    const postRequest = () => {
        axios.post('/log-in', { email, password })
            .then((data) => {
                if (data.data.redirect === 'success') {
                    console.log(data.data)
                    sessionStorage.setItem('token', data.data.accessToken)

                    history('/home')
                }
                else {
                    alert(data.data.message)
                }
            })
            .catch((err) => {
                console.log("error: ", err)
                alert('log in error')
            })
    }
    const submit = (e) => {
        e.preventDefault()
        console.log('submitted')
        postRequest();
    }


    return (
        <div>
            <div className="padding"></div>
            <div className="form-container"> 
            
                <div className="form"> 
                    <div className="hello">
                        A simple Movie App written to track your watchlist and help you discover new films. 
                    </div>
                    <div className="line">
                      
                    </div>
                    <form>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" id="email" placeholder="email"></input>
                        <br />
                        <br/>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="password"></input>
                        <br />
                        <br />
                        <Button variant="contained" type="submit" onClick={submit}>Log In</Button>
                        <br/>
                        <br/>
                        <Link to="/Register"><Button>Don't have an Account?</Button></Link>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Landing