import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Token from "../../Functions/token"
import "../../style/user_deposit.css"
import depositValidation from "../../Functions/deposit_validation";
function UserDeposit(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        id:"",
        name:"",
        accountNumber:"",
        cash:""
    })
    const [amount,setAmount] = useState("")
    const [error,setError] = useState("")
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
        setAmount(e.target.value)
    }

    function handleReset(){
        setAmount("")
        setError("")
    }

    async function handleSubmit(e){
        e.preventDefault();
        const validationError = depositValidation(amount);
        if(validationError){
            setError(validationError);
        } else {
            try {
                const postData = {
                    id: state.id,
                    cash: amount
                };
                const config = {
                    headers: Token.getAuthorizationHeader()
                };
                const res = await Axios.post("http://localhost:8080/api/user/deposit", postData, config);
                if(res.data.status){
                    alert(Number(amount).toFixed(2) + " LKR deposited to your account");
                    setAmount("");
                } else {
                    alert(res.data.error);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    return(
        <div className="user_deposit_container">
            <h3 className="user_deposit_heading">User Deposit</h3>
            <form className="user_deposit_form" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="user_deposit_input_div">
                    <label htmlFor="amount" className="user_deposit_input_label">Amount</label>
                    <input type="text" className="user_deposit_input_field" name="amount" value={amount}  placeholder="Enter deposit amount" onChange={handleChange}/>
                    {error && <h5 className="user_deposit_input_error">{error}</h5>}
                </div>
                <div className="user_deposit_button_div">
                    <input type="submit" value="Deposit" className="user_deposit_button"/>
                    <input type="reset" value="Clear" className="user_deposit_button"/>
                </div>
            </form>
        </div>
    )
}

export default UserDeposit;