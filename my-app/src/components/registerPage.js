import axios from "axios";
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import '../styles/landingpage.css'
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
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
        <div className="form-container">
        <div className="form">
             <div className="hello">
             A simple Movie App written to track your watchlist and help you discover new films.
             </div>
             <div className="line">
                      
                      </div>
            <form>
                <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder="email"></input>
                <br />
                <br/>
                <input onChange={(e) => setPassword1(e.target.value)} type='password' id="password1" placeholder="enter a password"></input>
                <br />
                <br/>
                <input onChange={(e) => setPassword2(e.target.value)} type='password' id="password2" placeholder="enter password again"></input>
                <br />
                <br/>
                <Button variant="contained" type="submit" onClick={submit}>Register</Button>
                <br/><br/>
                <Link to="/"><Button>Already have an Account?</Button></Link>
            </form>
 
            
        </div>
        </div>
        </div>
    )
}

export default Register