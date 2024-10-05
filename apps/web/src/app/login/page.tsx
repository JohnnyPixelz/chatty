// /app/login/page.js
'use client'; // Important for client-side rendering

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/pocketbase-utils';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            await loginUser(email, password);
            router.push('/profile'); // Redirect to profile after login
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
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
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;
