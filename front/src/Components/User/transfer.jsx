import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/user_transfer.css"
import transferValidation from "../../Functions/transfer_validation";
function UserTransfer(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        id:"",
        name:"",
        accountNumber:"",
        cash:""
    })

    const [input,setInput] = useState({
        amount:"",
        accountNumber:""
    })
    const [error,setError] = useState({
        amount:"",
        accountNumber:""
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

    function handleChange(e){
        setInput(prev=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    function handleReset(){
        setInput({
            amount:"",
            accountNumber:""
        })
        setError({
            amount:"",
            accountNumber:""
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        const validationError = transferValidation(input);
        if(validationError.amount === "" && validationError.accountNumber === ""){
            try {
                const postData = {
                    id: state.id,
                    accountNumber: input.accountNumber,
                    cash: input.amount
                };
                const config = {
                    headers: Token.getAuthorizationHeader()
                };
                const res = await Axios.post("http://localhost:8080/api/user/transfer", postData, config);
                if(res.data.status){
                    alert(Number(input.amount).toFixed(2) + " LKR tranfered from your account");
                    handleReset()
                } else {
                    alert(res.data.error);
                    setError({
                        amount:"",
                        accountNumber:""
                     })
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }else{
            setError(validationError)
        }
    }

    return(
        <div className="user_transfer_container">
            <h3 className="user_transfer_heading">User Transfer</h3>
            <form className="user_transfer_form" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="user_transfer_input_div">
                    <label htmlFor="accountNumber" className="user_transfer_input_label">Account Number</label>
                    <input type="text" className="user_transfer_input_field" name="accountNumber" value={input.accountNumber}  placeholder="Enter transfer account number" onChange={handleChange}/>
                    {error.accountNumber && <h5 className="user_transfer_input_error">{error.accountNumber}</h5>}
                </div>
                <div className="user_transfer_input_div">
                    <label htmlFor="amount" className="user_transfer_input_label">Amount</label>
                    <input type="text" className="user_transfer_input_field" name="amount" value={input.amount}  placeholder="Enter transfer amount" onChange={handleChange}/>
                    {error.amount && <h5 className="user_transfer_input_error">{error.amount}</h5>}
                </div>
                <div className="user_transfer_button_div">
                    <input type="submit" value="Transfer" className="user_transfer_button"/>
                    <input type="reset" value="Clear" className="user_transfer_button"/>
                </div>
            </form>
        </div>
    )
}

export default UserTransfer;