"use client";

import PocketBase, { AuthModel } from 'pocketbase';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://localhost:8090'); // Change the URL if necessary

export const registerUser = async (email: string, password: string) => {
    try {
        const user = await pb.collection('users').create({ username: "testuser", email, password, passwordConfirm: password });
        return user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const authData = await pb.collection('users').authWithPassword(
            email,
            password
        );
        return authData;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const logoutUser = async () => {
    try {
        pb.authStore.clear();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<null | AuthModel>(null);

    useEffect(() => {
        setUser(pb.authStore.model);
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        user
    }
};

export default pb;
