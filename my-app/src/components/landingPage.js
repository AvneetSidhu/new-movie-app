import React from "react"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import '../styles/homepage.css'
import '../styles/landingpage.css'

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
                    <h3>Log In</h3>
                    <form>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" id="email" placeholder="email"></input>
                        <br />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="password"></input>
                        <br />
                        <input type="submit" onClick={submit}></input>
                    </form>
                    <br />
                    <br />
                    <Link to="/Register"><button>Register</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Landing