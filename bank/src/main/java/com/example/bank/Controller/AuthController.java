package com.example.bank.Controller;

import com.example.bank.Config.Response;
import com.example.bank.Dto.AdminSignupDto;
import com.example.bank.Dto.LoginDto;
import com.example.bank.Dto.SignupDto;
import com.example.bank.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController{
    @Autowired
    AuthService authService;

    @PostMapping("/signup")
    public Response<?> signup(@RequestBody SignupDto signupDto){
        if(!authService.isEmailUnique(signupDto.getEmail())){
            return Response.builder()
                    .status(false)
                    .error("Email already exist")
                    .build();
        }
        else{
            return authService.signup(signupDto);
        }
    }
   @PostMapping("/admin/signup")
    public Response<?> adminRegister(@RequestBody AdminSignupDto adminSignupDto){
        if(!authService.isEmailUnique(adminSignupDto.getEmail())){
            return Response.builder()
                    .status(false)
                    .error("Email already exist")
                    .build();
        }
        else{
            return authService.adminRegister(adminSignupDto);
        }
    }

    @PostMapping("/login")
    public Response<?> login(@RequestBody LoginDto loginDto){
        if(!authService.loginVerify(loginDto)){
            return Response.builder()
                    .status(false)
                    .error("Email or Password wrong")
                    .build();
        }
        else{
            return authService.login(loginDto);
        }
    }
}

