import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/admin_addadmin.css"
import SignupValidation from "../../Functions/signup_validation";
function AdminAddAdmin(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        id:"",
        name:""
    })
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(!Token.isTokenExist()){
            navigate("/")
        }
        if(Token.isTokenExpired()){
            navigate("/")
        }
        const decode = jwtDecode(Token.getToken())
        setState({
            id:decode.id,
            name:decode.name
        })
    },[navigate])

    const [input,setInput] = useState({
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
        setInput(prev=>({
            ...prev,
            [e.target.name]:e.target.value.trim()
        }))
    }
    async function handleSubmit(e){
        e.preventDefault()
        const error = SignupValidation(input)
        setError(error)
        const noErrors = Object.values(error).every(value => value === "");
        if(noErrors){
            const postData = {
                adminId : state.id,
                name : input.name,
                email : input.email,
                password : input.password,
                birthdate : input.birthdate
            }
            const config = {
                headers: Token.getAuthorizationHeader()
            }
            await Axios.post("http://localhost:8080/api/admin/register",postData,config)
            .then(res => {
                if(res.data.status){
                    alert("Admin added successfully")
                    setInput({
                        name:"",
                        email:"",
                        password:"",
                        cpassword:"",
                        birthdate:""
                    })
                }else{
                    alert(res.data.error)
                }
            })
            .catch(err => {
                alert("Error")
            })
        }else{
            console.error("Fail")
        }
    }

function handleReset(e){
    setInput({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        birthdate:""
    })
    setError({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        birthdate:""
    })
}
    return(
            <div className="admin_addadmin_container">
                <h3 className="admin_addadmin_heading">Add Admin Page</h3>
                <form className="admin_addadmin_form" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="admin_addadmin_input_div">
                        <label htmlFor="name" className="admin_addadmin_input_label">Name</label>
                        <input type="text" className="admin_addadmin_input_field" name="name" value={input.name} placeholder="Enter admin name" onChange={handleChange}/>
                        {error.name && <h5 className="admin_addadmin_input_error">{error.name}</h5>}
                    </div>
                    <div className="admin_addadmin_input_div">
                        <label htmlFor="birthdate" className="admin_addadmin_input_label">Birthdate</label>
                        <input type="Date" className="admin_addadmin_input_field" name="birthdate" value={input.birthdate} placeholder="Enter admin birthdate" onChange={handleChange}/>
                        {error.birthdate && <h5 className="admin_addadmin_input_error">{error.birthdate}</h5>}
                    </div>
                    <div className="admin_addadmin_input_div">
                        <label htmlFor="email" className="admin_addadmin_input_label">Email</label>
                        <input type="text" className="admin_addadmin_input_field" name="email" value={input.email} placeholder="Enter admin email" onChange={handleChange}/>
                        {error.email && <h5 className="admin_addadmin_input_error">{error.email}</h5>}
                    </div>
                    <div className="admin_addadmin_input_div">
                        <label htmlFor="password" className="admin_addadmin_input_label">Password</label>
                        <input type="password" className="admin_addadmin_input_field" name="password" value={input.password} placeholder="Enter admin password" onChange={handleChange}/>
                        {error.password && <h5 className="admin_addadmin_input_error">{error.password}</h5>}
                    </div>
                    <div className="admin_addadmin_input_div">
                        <label htmlFor="cpassword" className="admin_addadmin_input_label">Confirm Password</label>
                        <input type="password" className="admin_addadmin_input_field" name="cpassword" value={input.cpassword} placeholder="Re-Enter admin password" onChange={handleChange}/>
                        {error.cpassword && <h5 className="admin_addadmin_input_error">{error.cpassword}</h5>}
                    </div>
                    <div className="admin_addadmin_button_div">
                        <input  className="admin_addadmin_submitbutton" type="submit" value="Register"/>
                        <input  className="admin_addadmin_resetbutton" type="reset" value="Clear"/>
                    </div>
                </form>
            </div>
    )
}
   

export default AdminAddAdmin;