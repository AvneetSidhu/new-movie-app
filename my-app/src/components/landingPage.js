import React from "react"
import { Link } from 'react-router-dom'
import { useState } from "react"
import axios from "axios";
const Landing = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const postRequest = () => {
        axios.post('/log-in', {email, password})
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log("error: ", err)
                alert(err.response.data.error)
            })
    }
    const submit = (e) => {
        e.preventDefault()
        console.log('submitted')
        postRequest();
    }
    console.log(email, password)

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