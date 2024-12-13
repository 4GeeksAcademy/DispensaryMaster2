import { Login } from "./Login.js";
import { Signup } from "./Signup.js";

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Reusable API request function
const apiRequest = async (endpoint, method, body) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        console.log("response", response)
        const data = await response.json();
        console.log("data", data)


        return {
            success: response.ok, 
            data: data,
            status: response.status,
            error: response.error
        }

    } catch (error) {
        console.error('API request error:', error);
        return { 
            success: false,
            data: null,


            error: error.message 

        };
    }
};

// Login function
export const login = (email, password) => apiRequest('/api/login', 'POST', { email, password });

// Signup function
export const signup = (email, password) => apiRequest('/api/signup', 'POST', { email, password });
