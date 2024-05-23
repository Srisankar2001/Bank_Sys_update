package com.example.bank.Service;

import com.example.bank.Entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class  JWTService {
    public String generateToken(User user){
        return Jwts.builder().setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 ))
                .claim("role",user.getRole().name())
                .claim("id",user.getId())
                .claim("name",user.getName())
                .claim("accountNumber",user.getAccountNumber())
                .signWith(getSiginKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public String extractUserName(String token){
        return extractClaim(token, Claims::getSubject);
    }
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers){
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSiginKey()).build().parseClaimsJws(token).getBody();
    }

    public int extractId(String token) {
        return extractClaim(token, claims -> claims.get("id", Integer.class));
    }

    public String extractName(String token){
        return extractClaim(token, claims -> claims.get("name", String.class));
    }

    public String extractAccountNumber(String token){
        return extractClaim(token, claims -> claims.get("accountNumber", String.class));
    }

    private Key getSiginKey(){
        byte[] key = Decoders.BASE64.decode("5750289BED1A2DC6E9E890008887E1C892387993E32FCE6197F144783CEC8174");

        return Keys.hmacShaKeyFor(key);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return(username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token){
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
