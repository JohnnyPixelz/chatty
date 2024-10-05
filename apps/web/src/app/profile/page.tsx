// /app/profile/page.js
'use client'; // Important for client-side rendering

import { logoutUser, useAuth } from '@/pocketbase-utils';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = async () => {
        await logoutUser();
        router.push('/login'); // Redirect to login after logout
    };

    return (
        <div>
            <h1>Your Profile</h1>
            {user ? (
                <div>
                    <p>Email: {user?.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
