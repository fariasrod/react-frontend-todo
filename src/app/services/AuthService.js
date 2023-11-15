import api from './api';


class AuthService {
  static async login(username, password) {
    try {
      const authModel = { username, password };
      const response = await api.post(`/login`, authModel);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.status;
      } else {
        throw new Error('Authentication failure');
      }

    } catch (error) {
      console.error('Authentication failure :', error);
      throw error;
    }
  }

}

export default AuthService;