import NextAuth from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Session, Account, User } from 'next-auth'
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

export const authOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.SA_FACEBOOK_LOGIN_KEY!,
            clientSecret: process.env.SA_FACEBOOK_LOGIN_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.SA_GOOGLE_OAUTH2_KEY!,
            clientSecret: process.env.SA_GOOGLE_OAUTH2_SECRET!
        }),
        TwitterProvider({
            clientId: process.env.SA_TWITTER_API_KEY!,
            clientSecret: process.env.SA_TWITTER_API_SECRET!
        }),
        InstagramProvider({
            clientId: process.env.SA_INSTAGRAM_AUTH_KEY!,
            clientSecret: process.env.SA_INSTAGRAM_AUTH_SECRET!
        })
    ],
    pages: {
        signIn: '/login', // Redirect errors to login page
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }: { token: JWT; user?: User; account?: Account | null }) {
            if (account && user) {
                try {
                    const convertion_payload: TokenValidation = {
                        grant_type: "convert_token",
                        client_id: process.env.DJANGO_BACKEND_CLIENT_ID!,
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
        session({ session, token }: { session: Session; token: JWT }) {
            session.backendToken = token.backendToken;
            return session
        },
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };