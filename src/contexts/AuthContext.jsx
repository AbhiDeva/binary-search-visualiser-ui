import React, { createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(token){
            axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
            getLoggedInUser();
        } else {
            setLoading(false);
        }
    }, [token])

    const getLoggedInUser = async () => {
        try {
          const res = await axios.get(`${API_URL}/auth/user`);
          setUser(res.data)
        } catch(error) {
            console.log('Failed to fetch user', error);
            logout();
        } finally {
           setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, {email, password});
        const { token, user}  = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const register = async (username, email, password ) => {
        const res = await axios.post(`${API_URL}/auth/register` , { username, email, password});
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
        axios.defaults.header.common['Authorization'] = `Bearer ${token}`;
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            register,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}