import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router"; // Importar o useRouter
import Link from "next/link";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter(); // Usar o useRouter para redirecionar

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Credenciais inválidas");
        } else {
            // Usando router.push para redirecionar para a Dashboard
            router.push("/dashboard");
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <h1>Bem-vindo ao Todo List</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Digite seu email" 
                            required
                        />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Digite sua senha" 
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Entrar</button>
                </form>

                <div className="auth-links">
                    <p>Ainda não tem uma conta?</p>
                    <Link href="/signup"> {/* Removendo legacyBehavior */}
                        <a className="signup-link">Crie uma conta</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
