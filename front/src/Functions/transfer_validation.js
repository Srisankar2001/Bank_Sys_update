function transferValidation(input){
    let error = {
        amount : "",
        accountNumber : ""
    }

    if(input.amount === ""){
        error.amount = "Deposit amount is empty"
    }else if (!(/^-?\d+(\.\d{1,2})?$/.test(input.amount))) {
        error.amount = "Deposit amount can only be a number"
    }else if(input.amount <= 0){
        error.amount = "Invalid deposit amount"
    }else{
        error.amount = ""
    }

    if(input.accountNumber === ""){
        error.accountNumber = "Account number field is empty"
    }else if(!(/^[A-Z]{4}[0-9]{4}$/.test(input.accountNumber))){
        error.accountNumber = "Invalid account number"
    }else{
        error.accountNumber = ""
    }

    return error;
}

export default transferValidation;