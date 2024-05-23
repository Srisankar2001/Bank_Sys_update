import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/admin_alltransfer.css"
function AdminAllTransfer(){
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
                const res = await Axios.post("http://localhost:8080/api/admin/getAllTransfer", postData , config);
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
                    <td colSpan="5" className="admin_alltransfer_message">No Tranfers Available</td>
                </tr>
            );
        }
        return data.map((item, index) => (
            <React.Fragment key={index}>
                    <tr className="admin_alltransfer_table_body_row">
                        <td className="admin_alltransfer_table_body_col">{item.id}</td>
                        <td className="admin_alltransfer_table_body_col">{item.localDate}</td>
                        <td className="admin_alltransfer_table_body_col">{formatTime(item.localTime)}</td>
                        <td className="admin_alltransfer_table_body_col">{item.userAccountNumber}</td>
                        <td className="admin_alltransfer_table_body_col">{item.receiverAccountNumber}</td>
                        <td className="admin_alltransfer_table_body_col">{(Number(item.amount).toFixed(2)).toString() + " LKR"}</td>
                    </tr>
            </React.Fragment>
        ));
    };

    const formatTime = (timeString) => {
        const time = new Date("2000-01-01T" + timeString);
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return time.toLocaleTimeString('en-US', options);
    };


    return(
        <div className="admin_alltransfer_container">
            <h3 className="admin_alltransfer_heading">All Tranfers</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="admin_alltransfer_table">
                    <thead>
                        <tr className="admin_alltransfer_table_head_row">
                            <th className="admin_alltransfer_table_head_col">Transaction Id</th>
                            <th className="admin_alltransfer_table_head_col">Date</th>
                            <th className="admin_alltransfer_table_head_col">Time</th>
                            <th className="admin_alltransfer_table_head_col">Sender A/C Number</th>
                            <th className="admin_alltransfer_table_head_col">Receiver A/C Number</th>
                            <th className="admin_alltransfer_table_head_col">Amount</th>
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

export default AdminAllTransfer;