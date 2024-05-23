import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/admin_alladmin.css"
function AdminAllAdmin(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        id:"",
        name:""
    })
    const [data , setData ] = useState([])
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

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const postData = {
                    adminId : state.id
                }
                const config = {
                    headers: Token.getAuthorizationHeader()
                }
                const res = await Axios.post("http://localhost:8080/api/admin/getAllAdmins", postData , config);
                if(res.data.status){
                    setData(res.data.data)
                } else {
                   alert(res.data.error)
                }
            } catch (error) {
                console.error("Error:", error);
            } finally{
                setLoading(false)
            }
        }

        if(state.id){
            fetchData();
        }

    },[state.id,navigate])

    const renderData = () => {
        if (data.length === 0) {
            return (
                <tr>
                    <td colSpan="5" className="admin_alladmin_message">No Admins Available</td>
                </tr>
            );
        }
        return data.map((item, index) => (
            <React.Fragment key={index}>
                    <tr className="admin_alladmin_table_body_row">
                        <td className="admin_alladmin_table_body_col">{item.id}</td>
                        <td className="admin_alladmin_table_body_col">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                        <td className="admin_alladmin_table_body_col">{item.age}</td>
                        <td className="admin_alladmin_table_body_col">{item.email}</td>
                        <td className="admin_alladmin_table_body_col">{item.created_at}</td>
                    </tr>
            </React.Fragment>
        ));
    };

    return(
        <div className="admin_alladmin_container">
            <h3 className="admin_alladmin_heading">All Admins</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="admin_alladmin_table">
                    <thead>
                        <tr className="admin_alladmin_table_head_row">
                            <th className="admin_alladmin_table_head_col">Id</th>
                            <th className="admin_alladmin_table_head_col">Name</th>
                            <th className="admin_alladmin_table_head_col">Age</th>
                            <th className="admin_alladmin_table_head_col">Email</th>
                            <th className="admin_alladmin_table_head_col">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminAllAdmin;