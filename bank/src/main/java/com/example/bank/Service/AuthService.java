package com.example.bank.Service;

import com.example.bank.Config.Response;
import com.example.bank.Dto.AdminSignupDto;
import com.example.bank.Dto.LoginDto;
import com.example.bank.Dto.SignupDto;
import com.example.bank.Entity.Role;
import com.example.bank.Entity.User;
import com.example.bank.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class  AuthService{
    @Autowired
    UserRepository userRepository;
    @Autowired
     PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JWTService jwtService;
    public Response<?> signup(SignupDto signupDto){
        User user = User.builder()
                .name(signupDto.getName())
                .email(signupDto.getEmail())
                .birthdate(signupDto.getBirthdate())
                .created_at(LocalDate.now())
                .is_active(true)
                .cash(0.0)
                .role(Role.USER)
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .accountNumber(generateAccountNumber())
                .build();
        userRepository.save(user);
        String jwt = jwtService.generateToken(user);
        return Response.builder()
                .status(true)
                .token(jwt)
                .build();
    }

    public Response<?> login(LoginDto loginDto){
        Authentication auth=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
                loginDto.getPassword()));
        Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
        if(user.isPresent()){
            String jwt = jwtService.generateToken(user.get());
            return Response.builder()
                    .status(true)
                    .token(jwt)
                    .build();
        }else{
            return Response.builder()
                    .status(false)
                    .error("User not found")
                    .build();
        }

    }


    public boolean isEmailUnique(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        return existingUser.isEmpty();
    }

    public boolean loginVerify(LoginDto loginDto) {
        Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
        if (user.isPresent()) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            return passwordEncoder.matches(loginDto.getPassword(),user.get().getPassword());
        }
        else{
            return false;
        }



    }


    public String generateAccountNumber(){
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        // Generate first four letters (uppercase alphabets)
        for (int i = 0; i < 4; i++) {
            char uppercaseLetter = (char) (random.nextInt(26) + 'A');
            sb.append(uppercaseLetter);
        }

        // Generate last four digits
        for (int i = 0; i < 4; i++) {
            int digit = random.nextInt(10);
            sb.append(digit);
        }

        if(isUniqueAccountNumber(sb.toString())){
            return sb.toString();
        }else return  generateAccountNumber();
    }

    public boolean isUniqueAccountNumber(String accountNumber){
        Optional<User> existingUser = userRepository.findByAccountNumber(accountNumber);
        if(existingUser.isPresent()){
            return false;
        }else return true;
    }

    public Response<?> adminRegister(AdminSignupDto adminSignupDto) {
        User user = User.builder()
                .name(adminSignupDto.getName())
                .email(adminSignupDto.getEmail())
                .birthdate(adminSignupDto.getBirthdate())
                .created_at(LocalDate.now())
                .is_active(true)
                .cash(null)
                .role(Role.ADMIN)
                .password(passwordEncoder.encode(adminSignupDto.getPassword()))
                .accountNumber(null)
                .build();
        userRepository.save(user);
        return Response.builder()
                .status(true)
                .build();
    }
}

