function withdrawValidation(amount){
    let error = "";
    if(amount === ""){
        error = "Withdraw amount is empty"
    }else if (!/^-?\d+(\.\d{1,2})?$/.test(amount)) {
        error = "Withdraw amount can only be a number";
    }else if(amount <= 0){
        error = "Invalid withdraw amount"
    }else{
        error = ""
    }

    return error;
}

export default withdrawValidation;