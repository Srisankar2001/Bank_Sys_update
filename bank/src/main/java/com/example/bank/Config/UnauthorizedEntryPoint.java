package com.example.bank.Config;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.Serializable;
import java.util.Objects;

@Component
public class UnauthorizedEntryPoint implements AuthenticationEntryPoint, Serializable {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        System.out.println(authException.getMessage());
        if(Objects.equals(authException.getMessage(), "Bad credentials")){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, authException.getMessage());
            return;
        }
        response.sendError(HttpServletResponse.SC_BAD_GATEWAY, authException.getMessage());
    }

}
