'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();

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
