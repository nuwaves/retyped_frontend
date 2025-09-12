'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/app/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Error message mapping
    const errorMessages = {
        'Configuration': 'Authentication service configuration error. Please try again.',
        'AccessDenied': 'Access denied. Please check your permissions.',
        'Verification': 'Email verification required. Please check your email.',
        'Default': 'Authentication failed. Please try again.',
        'BackendConnection': 'Unable to connect to authentication service. Please try again later.',
        'TokenConversion': 'Authentication successful, but service connection failed. Please contact support.'
    };

    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            setErrorMessage(errorMessages[error] || errorMessages.Default);
        }
    }, [searchParams]);

    const handleSocialLogin = async (provider: string) => {
        try {
            setIsLoading(provider);
            const result = await signIn(provider, {
                callbackUrl: '/',
                redirect: false,
            });

            if (result?.ok) {
                // Check if session is established
                const session = await getSession();
                if (session) {
                    router.push('/');
                }
            }
        } catch (error) {
            console.error(`${provider} login failed:`, error);
        } finally {
            setIsLoading(null);
        }
    };

    const socialProviders = [
        {
            id: 'google',
            name: 'Google',
            icon: "",
            bgColor: 'bg-red-500 hover:bg-red-600',
            textColor: 'text-white'
        },
        {
            id: 'facebook',
            name: 'Facebook',
            icon: "",
            bgColor: 'bg-blue-600 hover:bg-blue-700',
            textColor: 'text-white'
        },
        {
            id: 'twitter',
            name: 'Twitter',
            icon: "",
            bgColor: 'bg-sky-500 hover:bg-sky-600',
            textColor: 'text-white'
        },
        {
            id: 'instagram',
            name: 'Instagram',
            icon: "",
            bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
            textColor: 'text-white'
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Choose your preferred sign-in method
                    </p>
                    {errorMessage && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-800">{errorMessage}</p>
                                </div>
                                <div className="ml-auto pl-3">
                                    <div className="-mx-1.5 -my-1.5">
                                        <button
                                            onClick={() => setErrorMessage(null)}
                                            className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                                        >
                                            <span className="sr-only">Dismiss</span>
                                            <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 space-y-4">
                    {socialProviders.map((provider) => (
                        <button
                            key={provider.id}
                            onClick={() => handleSocialLogin(provider.id)}
                            disabled={isLoading === provider.id}
                            className={`
                group relative w-full flex justify-center py-3 px-4 border border-transparent 
                text-sm font-medium rounded-lg transition-all duration-200
                ${provider.bgColor} ${provider.textColor}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
                        >
                            {isLoading === provider.id ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Connecting...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={provider.icon}
                                        className="w-5 h-5 mr-3"
                                    />
                                    Continue with {provider.name}
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">
                                Secure authentication powered by NextAuth
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        ← Back to previous page
                    </button>
                </div>
            </div>
        </div>
    );
}
