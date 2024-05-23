function depositValidation(amount){
    let error = "";
    if(amount === ""){
        error = "Deposit amount is empty"
    }else if (!/^-?\d+(\.\d{1,2})?$/.test(amount)) {
        error = "Deposit amount can only be a number";
    }else if(amount <= 0){
        error = "Invalid deposit amount"
    }else{
        error = ""
    }

    return error;
}

export default depositValidation;