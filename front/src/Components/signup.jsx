import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import {jwtDecode} from "jwt-decode";
import "../style/signup_page.css";
import SignupValidation from "../Functions/signup_validation";
import * as Token from "../Functions/token"

function Signup(){
    useEffect(()=>{
        Token.deleteToken()
    })
    const navigate = useNavigate()
    const [state,setState] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        birthdate:""
    })
    const [error,setError] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        birthdate:""
    })
    function handleChange(e){
        setState(prev=>({
            ...prev,
            [e.target.name]:e.target.value.trim()
        }))
    }
    async function handleSubmit(e){
        e.preventDefault()
        const error = SignupValidation(state)
        setError(error)
        const noErrors = Object.values(error).every(value => value === "");
        if(noErrors){
            const postData = {
                name : state.name,
                email : state.email,
                password : state.password,
                birthdate : state.birthdate
            }
            await Axios.post("http://localhost:8080/api/auth/signup",postData)
            .then(res => {
                if(res.data.status){
                    Token.saveToken(res.data.token)
                    const decode = jwtDecode(Token.getToken())
                    if(decode.role === "USER"){
                        navigate("user/dashboard")
                    }else if(decode.role === "ADMIN"){
                        navigate("admin/dashboard")
                    }
                }else{
                    alert(res.data.error)
                }
            })
            .catch(err => {
                alert("Error")
            })
        }else{
            console.error("Fail")
            console.log(state)
        }
    }
    return(
            <div className="signup_container">
                <h3 className="signup_heading">Login Page</h3>
                <form className="signup_form" onSubmit={handleSubmit}>
                <div className="signup_input_div">
                        <label htmlFor="name" className="signup_input_label">Name</label>
                        <input type="text" className="signup_input_field" name="name" value={state.name} placeholder="Enter your name" onChange={handleChange}/>
                        {error.name && <h5 className="signup_input_error">{error.name}</h5>}
                    </div>
                    <div className="signup_input_div">
                        <label htmlFor="birthdate" className="signup_input_label">Birthdate</label>
                        <input type="Date" className="signup_input_field" name="birthdate" value={state.birthdate} placeholder="Enter your birthdate" onChange={handleChange}/>
                        {error.birthdate && <h5 className="signup_input_error">{error.birthdate}</h5>}
                    </div>
                    <div className="signup_input_div">
                        <label htmlFor="email" className="signup_input_label">Email</label>
                        <input type="text" className="signup_input_field" name="email" value={state.email} placeholder="Enter your email" onChange={handleChange}/>
                        {error.email && <h5 className="signup_input_error">{error.email}</h5>}
                    </div>
                    <div className="signup_input_div">
                        <label htmlFor="password" className="signup_input_label">Password</label>
                        <input type="password" className="signup_input_field" name="password" value={state.password} placeholder="Enter your password" onChange={handleChange}/>
                        {error.password && <h5 className="signup_input_error">{error.password}</h5>}
                    </div>
                    <div className="signup_input_div">
                        <label htmlFor="cpassword" className="signup_input_label">Confirm Password</label>
                        <input type="password" className="signup_input_field" name="cpassword" value={state.cpassword} placeholder="Re-Enter your password" onChange={handleChange}/>
                        {error.cpassword && <h5 className="signup_input_error">{error.cpassword}</h5>}
                    </div>
                    <div className="signup_button_div">
                        <input  className="signup_button" type="submit" value="Register"/>
                        <Link to="/">
                            <input  className="signup_button" type="button" value="Signin"/>
                        </Link>
                    </div>
                </form>
            </div>
    )
}

export default Signup;