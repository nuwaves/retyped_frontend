'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken, clearAuthToken } from '@/app/_store/features/auth/authSlice';
import { AppDispatch } from '@/app/_store/store';

export function AuthManager() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.backendToken) {
                dispatch(setAuthToken(session.backendToken));
            }
        } else if (status === 'unauthenticated') {
            dispatch(clearAuthToken());
        }
    }, [status, session, dispatch]);

    return null;
}
