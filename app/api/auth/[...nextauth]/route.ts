import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import InstagramProvider from "next-auth/providers/instagram";
import TwitterProvider from "next-auth/providers/twitter";
import authApiClient from "@/app/lib/authApi";
import { TokenValidation } from '@/app/types/api.types'

declare module "next-auth/jwt" {
    interface JWT {
        backendToken?: string;
    }
}

declare module "next-auth" {
    interface Session {
        backendToken?: string;
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
            clientId: process.env.SA_FACEBOOK_LOGIN_KEY,
            clientSecret: process.env.SA_FACEBOOK_LOGIN_SECRET
        }),
        GoogleProvider({
            clientId: process.env.SA_GOOGLE_OAUTH2_KEY,
            clientSecret: process.env.SA_GOOGLE_OAUTH2_SECRET
        }),
        TwitterProvider({
            clientId: process.env.SA_TWITTER_API_V2_KEY,
            clientSecret: process.env.SA_TWITTER_API_V2_SECRET
        }),
        InstagramProvider({
            clientId: process.env.SA_INSTAGRAM_AUTH_KEY,
            clientSecret: process.env.SA_INSTAGRAM_AUTH_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                const convertion_payload: TokenValidation = {
                    grant_type: "convert_token",
                    client_id: process.env.DJANGO_BACKEND_CLIENT_ID,
                    backend: backends_mapping[account.provider],
                    token: account.access_token
                }
                const convertion_data = await authApiClient.getConvertionToken(convertion_payload)
                token.backendToken = convertion_data.token;
                token.access_token = account.access_token;
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