import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import InstagramProvider from "next-auth/providers/instagram";
import TwitterProvider from "next-auth/providers/twitter";
import { getConvertionToken } from "@/app/lib/authApi";
import { TokenValidation, BackendToken } from '@/app/types/api.types'

declare module "next-auth/jwt" {
    interface JWT {
        backendToken?: BackendToken;
    }
}

declare module "next-auth" {
    interface Session {
        backendToken?: BackendToken;
    }
}

const backends_mapping: Record<string, string> = {
    "facebook": "facebook",
    "google": "google-oauth2",
    "twitter": "twitter",
    "instagram": "instagram"
}

const handler = NextAuth({
    providers: [
        FacebookProvider({
            clientId: process.env.SA_FACEBOOK_LOGIN_KEY || "1521249572572311",
            clientSecret: process.env.SA_FACEBOOK_LOGIN_SECRET || "323fc30e6db964ee0cac309faeeb03d4"
        }),
        GoogleProvider({
            clientId: process.env.SA_GOOGLE_OAUTH2_KEY || "499151202569-fqsqb09kg5pmmqo8vk4j8ck2tb44rvv8.apps.googleusercontent.com",
            clientSecret: process.env.SA_GOOGLE_OAUTH2_SECRET || "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"
        }),
        TwitterProvider({
            clientId: process.env.SA_TWITTER_API_KEY || "W6mg1s82hxoqQmTe6dVnVVKZ7",
            clientSecret: process.env.SA_TWITTER_API_SECRET || "YtR2U5FGJbwXSQgzwmvudEjPNxTYUU4m0rQrv3uj88LKQbRv9y"
        }),
        InstagramProvider({
            clientId: process.env.SA_INSTAGRAM_AUTH_KEY || "1302794741538579",
            clientSecret: process.env.SA_INSTAGRAM_AUTH_SECRET || "687705d684da9ac49387fd2baf423d6c"
        })
    ],
    pages: {
        signIn: '/login', // Redirect errors to login page
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                try {
                    const convertion_payload: TokenValidation = {
                        grant_type: "convert_token",
                        client_id: process.env.DJANGO_BACKEND_CLIENT_ID || "f7xe6UBBznONzk8CEjaAHUgHBItNk0xs8YtOGQWj",
                        backend: backends_mapping[account.provider],
                        token: account.access_token || ""
                    }
                    const convertion_data = await getConvertionToken(convertion_payload)
                    const backend_token: BackendToken = {
                        access_token: convertion_data.access_token,
                        refresh_token: convertion_data.refresh_token,
                        user: convertion_data.user ?? {}
                    } 
                    token.backendToken = backend_token;
                    token.access_token = account.access_token || "";
                } catch (error) {
                    console.error('Backend token conversion failed:', error);
                    // Still allow NextAuth session but without backend token
                    token.backendToken = undefined;
                    token.access_token = account.access_token || "";
                }
            }
            return token;
        },
        session({ session, token, user }) {
            session.backendToken = token.backendToken;
            return session
        },
    }
})
export { handler as GET, handler as POST };