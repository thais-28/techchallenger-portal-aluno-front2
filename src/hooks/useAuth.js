import { useState, useEffect } from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Simulate an API call for authentication
            const response = await fakeApiLogin(email, password);
            setUser(response.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        // Simulate fetching user data from local storage or an API
        const fetchUser = async () => {
            const storedUser = await fakeApiFetchUser();
            setUser(storedUser);
            setLoading(false);
        };
        fetchUser();
    }, []);

    return { user, loading, error, login, logout };
};

// Fake API functions for demonstration purposes
const fakeApiLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'teacher@example.com' && password === 'password') {
                resolve({ user: { email } });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1000);
    });
};

const fakeApiFetchUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null); // No user logged in initially
        }, 1000);
    });
};

export default useAuth;