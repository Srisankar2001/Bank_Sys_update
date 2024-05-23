import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/user_alltransfer.css"
function UserAllTransfer(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        id:"",
        name:"",
        accountNumber:"",
        cash:""
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
            name:decode.name,
            accountNumber:decode.accountNumber,
            cash:""
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
                        cash: res.data.data.cash
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

    useEffect(()=>{
        const postData = {
            id : state.id
        }
        const config = {
            headers: Token.getAuthorizationHeader()
        }
        const fetchData = async () => {
            try {
                const postData = {
                    id : state.id
                }
                const config = {
                    headers: Token.getAuthorizationHeader()
                }
                const res = await Axios.post("http://localhost:8080/api/user/getTransfers", postData , config);
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
                    <td colSpan="5" className="user_all_transfer_message">No Transfers Available</td>
                </tr>
            );
        }
        return data.map((item, index) => (
            <tr
              key={index}
              className="user_all_transfer_table_body_row"
              style={{ color: item.userId === state.id ? "red" : "green" }}
            >
                {console.log(item)}
              <td className="user_all_transfer_table_body_col">{item.localDate}</td>
              <td className="user_all_transfer_table_body_col">{formatTime(item.localTime)}</td>
              <td className="user_all_transfer_table_body_col">{item.userId === state.id ? item.receiverAccountNumber : "-"}</td>
              <td className="user_all_transfer_table_body_col">{(Number(item.amount).toFixed(2)) + " LKR"}</td>
              <td className="user_all_transfer_table_body_col">{(Number(item.total).toFixed(2)) + " LKR"}</td>
            </tr>
          ));          
    };
    
    const formatTime = (timeString) => {
        const time = new Date("2000-01-01T" + timeString);
        const options = { hour: 'numeric', minute: '2-digit', hour12: true };
        return time.toLocaleTimeString('en-US', options);
    };

    return(
        <div className="user_all_transfer_container">
            <h3 className="user_all_transfer_heading">User Transfer History</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="user_all_transfer_table">
                    <thead>
                        <tr className="user_all_transfer_table_head_row">
                            <th className="user_all_transfer_table_head_col">Date</th>
                            <th className="user_all_transfer_table_head_col">Time</th>
                            <th className="user_all_transfer_table_head_col">Receiver</th>
                            <th className="user_all_transfer_table_head_col">Amount</th>
                            <th className="user_all_transfer_table_head_col">Balance</th>
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

export default UserAllTransfer;