import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
            });

            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                return { id: user.id, name: user.name, email: user.email };
            }

            return null;
        },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.email = user.email;
        }
        return token;
        },
        async session({ session, token }) {
        if (token) {
            session.id = token.id;
            session.email = token.email;
        }
        return session;
        },
    },
});
