import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = "token";

class TokenService {

    static getToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    }

    static getNameFromToken() {
        const token = TokenService.getToken();

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));

                if (decodedToken && decodedToken.name) {
                    return decodedToken.name;
                } else {
                    console.error('Attribute "name" not found in token.');
                }
            } catch (error) {
                console.error('Error decoding the token :', error.message);
            }
        }

        return null;
    }

    static getIdFromToken() {
        const token = TokenService.getToken();

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                if (decodedToken && decodedToken.id) {
                    return decodedToken.id;
                } else {
                    console.error('Attribute "id" not found in token.');
                }
            } catch (error) {
                console.error('Error decoding the token :', error.message);
            }
        }

        return null;
    };

    static isAuthenticated() {
        const token = getToken();
        if (token == null) return false;
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    }
}

export default TokenService;