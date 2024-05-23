import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import {jwtDecode} from "jwt-decode";
import "../style/signin_page.css";
import SigninValidation from "../Functions/signin_validation";
import * as Token from "../Functions/token"


function Signin(){
    useEffect(()=>{
        Token.deleteToken()
    })
    const navigate = useNavigate()
    const [state,setState] = useState({
        email:"",
        password:""
    })
    const [error,setError] = useState({
        email:"",
        password:""
    })
    function handleChange(e){
        setState(prev=>({
            ...prev,
            [e.target.name]:e.target.value.trim()
        }))
    }
    async function handleSubmit(e){
        e.preventDefault()
        const error = SigninValidation(state)
        setError(error)
        if(error.email === "" && error.password === ""){
            const postData = {
                email : state.email,
                password : state.password
            }
            await Axios.post("http://localhost:8080/api/auth/login",postData)
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
        }else{
            console.error("Fail")
            console.log(state)
        }
    }
    return(
            <div className="signin_container">
                <h3 className="signin_heading">Login Page</h3>
                <form className="signin_form" onSubmit={handleSubmit}>
                    <div children="signin_input_div">
                        <label htmlFor="email" className="signin_input_label">Email</label>
                        <input type="text" className="signin_input_field" name="email" value={state.email} placeholder="Enter your email" onChange={handleChange}/>
                        {error.email && <h5 className="signin_input_error">{error.email}</h5>}
                    </div>
                    <div className="signin_input_div">
                        <label htmlFor="password" className="signin_input_label">Password</label>
                        <input type="password" className="signin_input_field" name="password" value={state.password} placeholder="Enter your password" onChange={handleChange}/>
                        {error.password && <h5 className="signin_input_error">{error.password}</h5>}
                    </div>
                    <div className="signin_button_div">
                        <input  className="signin_button" type="submit" value="Signin"/>
                        <Link to="/signup">
                            <input  className="signin_button" type="button" value="Register"/>
                        </Link>
                    </div>
                </form>
            </div>
    )
}

export default Signin;