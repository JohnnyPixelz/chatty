'use client'; // Important for client-side rendering

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/pocketbase-utils';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            router.push('/login'); // Redirect to login after registration
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Register;