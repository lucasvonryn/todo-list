import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Signup.module.css"; // Importando o módulo CSS

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(true);
            setTimeout(() => {
                router.push("/"); // Redireciona para login após sucesso
            }, 2000);
        } else {
            setError(data.error || "Erro ao criar conta. Tente novamente.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.signupForm}>
                <h1>Criar Conta</h1>
                {success && <p className={styles.successMessage}>Conta criada com sucesso! Redirecionando para login...</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Criar Conta</button>
                </form>

                <div className={styles.authLinks}>
                    <Link href="/">
                        <a className={styles.backLink}>Voltar ao início</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
