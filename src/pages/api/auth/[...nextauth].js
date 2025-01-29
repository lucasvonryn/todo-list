import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (credentials.email === "user@example.com" && credentials.password === "123456") {
                return { id: 1, name: "User", email: "user@example.com" };
            } else {
                return null;
            }
        }
        })
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error"
    },
    session: {
        strategy: "jwt"
    }
});
