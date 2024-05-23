function SignupValidation(state){
    let error = {
        name:"",
        email:"",
        password:"",
        cpassword:"",
        birthdate:""
    };

    if(state.name === ""){
        error.name = "Name field is empty"
    }else if((!/^[a-zA-Z]{2,}-?\d*$/.test(state.name))){
        error.name = "Enter a valid name"
    }else{
        error.name = ""
    }

    if(state.birthdate == ""){
        error.birthdate = "Select the birth date"
    }else{
        // Convert the birthdate string to a Date object
        var birthdate = new Date(state.birthdate);

        // Calculate the date 18 years ago
        var eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

        // Check if the user's birthdate is after the date 18 years ago
        if (birthdate > eighteenYearsAgo) {
            error.birthdate = "You must be 18 to register";
        } else {
            error.birthdate = "";
        }
    }

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

    if(state.cpassword === ""){
        error.cpassword = "Confirm Password field is empty"
    }else if(state.password !== state.cpassword){
        error.cpassword = "Password & Confirm password must be same"
    }else{
        error.cpassword = ""
    }

    return error;
}

export default SignupValidation;