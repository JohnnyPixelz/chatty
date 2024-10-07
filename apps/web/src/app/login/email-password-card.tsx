'use client'; // Important for client-side rendering

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function EmailPasswordCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {

            // TODO implement login e.g. await loginUser(email, password);
            
            router.push('/profile'); // Redirect to profile after login
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message);
                // setError(error.message);
            } else {
                toast("An unknown error occurred.");
                // setError('An unknown error occurred');
            }
        }
    };

    return (
        <>
            <Card className="w-[350px]">
                <form onSubmit={handleLogin}>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your login credentials for access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="link">Register</Button>
                        <Button>Login</Button>
                    </CardFooter>
                </form>
            </Card>
            <Toaster />
        </>
    )
}
