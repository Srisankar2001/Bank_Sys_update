import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/admin_dashboard.css"
function AdminDashboard(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        id:"",
        name:"",
        email:""
    })
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
            name:decode.name.charAt(0).toUpperCase() + decode.name.slice(1)
        })
        const postData = {
            id : state.id
        }
        const config = {
            headers: Token.getAuthorizationHeader()
        }
        const fetchData = async () => {
            try {
                const postData = {
                    id : decode.id
                }
                const config = {
                    headers: Token.getAuthorizationHeader()
                }
                const res = await Axios.post("http://localhost:8080/api/user/detail", postData , config);
                if(res.data.status){
                    setState(prev => ({
                        ...prev,
                        email:res.data.data.email
                    }))
                } else {
                    alert(res.data.error)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
        
    },[navigate])

    return(
        <div className="admin_dashboard_container">
            <h3 className="admin_dashboard_heading">Admin Dashboard</h3>
            <h3 className="admin_dashboard_text">Name : {state.name}</h3>
            <h3 className="admin_dashboard_text">Email : {state.email}</h3>
        </div>
    )
}

export default AdminDashboard;