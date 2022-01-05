import axios from "axios";
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import '../styles/landingpage.css'

const Register = () => {

    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const postRequest = () => {
        let password = password1
        axios.post('/sign-up', { email, password })
            .then((data) => {
                console.log(data);
                history('/');
            })
            .catch((err) => {
                console.log("error: ", err)
                alert(err.response.data.error)
            })

    }

    const submit = (e) => {
        e.preventDefault()
        console.log('submitted')
        if (password1 !== password2) {
            alert("passwords do not match")
            return
        }
        postRequest();
    }
    return (
        <div>
        <div className="padding"></div>
        <div className="form">
            <h3>Register</h3>
            <form>
                <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder="email"></input>
                <br />
                <input onChange={(e) => setPassword1(e.target.value)} type='password' id="password1" placeholder="enter a password"></input>
                <br />
                <input onChange={(e) => setPassword2(e.target.value)} type='password' id="password2" placeholder="enter password again"></input>
                <br />
                <input type="submit" onClick={submit}></input>
            </form>
            <br />
            <br />
            <Link to="/"><button>Log In</button></Link>
        </div>
        </div>
    )
}

export default Register