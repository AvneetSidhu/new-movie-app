import React from "react"
import { Link } from 'react-router-dom'
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();

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
            <Link to="/Register">Register</Link>
            <form>
                <input onChange={(e) => setEmail(e.target.value)}  type="text" id="email" placeholder="email"></input>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="password"></input>
                <input type="submit" onClick={submit}></input>
            </form>
        </div>
    )
}

export default Landing