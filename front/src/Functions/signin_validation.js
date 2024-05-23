function SigninValidation(state){
    let error = {
        email:"",
        password:""
    };
    if(state.email === ""){
        error.email = "Email field is empty"
    }else if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(state.email))){
        error.email = "Enter a valid email"
    }else{
        error.email = ""
    }

    if(state.password === ""){
        error.password = "Password field is empty"
    }else{
        error.password = ""
    }

    return error;
}

export default SigninValidation;