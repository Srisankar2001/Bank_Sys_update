const { jwtDecode } = require('jwt-decode');
export  function saveToken(token){
    localStorage.setItem('token',token)
}

export  function deleteToken(){
    localStorage.removeItem('token')
}
export  function getToken(){
    return localStorage.getItem('token')
}

export  function isTokenExist(){
    const token = localStorage.getItem('token')
    return (token !== null)
}

export  function getAuthorizationHeader() {
    const token = getToken();
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return null;
}

export function isTokenExpired() {
    const token = getToken();
    
    if (!token) {
        // If token doesn't exist, consider it expired
        deleteToken();
        return true;
    }

    // Decode the token
    const decodedToken = jwtDecode(token);
    
    // Get the expiration time (in seconds)
    const expirationTime = decodedToken.exp;

    // Get the current time (in milliseconds)
    const currentTime = Date.now() / 1000; // Convert to seconds
    
    // Check if the token has expired
    if (expirationTime < currentTime) {
        // Token has expired, delete it
        deleteToken();
        return true;
    }

    return false;
}
