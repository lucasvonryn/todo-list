import { useSession, signIn } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    signIn(); // Redireciona para a página de login se não estiver autenticado
    return <div>Carregando...</div>;
  }

  return (
    <div>
        <h1>Bem-vindo ao seu To-Do List!</h1>
        <p>Em breve, você verá suas tarefas aqui.</p>
    </div>
  );
}
