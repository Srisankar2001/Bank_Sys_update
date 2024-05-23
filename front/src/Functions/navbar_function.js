import * as Token from "../Functions/token"
import { jwtDecode } from "jwt-decode"

export function isAuthendicated(){
    if(Token.isTokenExist() && !Token.isTokenExpired()){
        return true
    }
    return false
}

export function isAdmin(){
    const token = Token.getToken();
    if (!token) {
        Token.deleteToken();
        return false
    }
    const decodedToken = jwtDecode(token);
    if(decodedToken.role === "ADMIN"){
        return true
    }

    return false
}

export async function clear() {
    return new Promise((resolve, reject) => {
        try {
            Token.deleteToken();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
