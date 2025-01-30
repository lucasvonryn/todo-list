import { signOut } from "next-auth/react";  // Importe o signOut
import Link from "next/link";
import styles from "./Dashboard.module.css"; // Ou o nome do seu arquivo CSS

export default function Dashboard() {
    const handleLogout = () => {
        signOut(); // Isso vai deslogar o usuário
    };

    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <h1>Bem-vindo, usuário!</h1>

          {/* Outras informações da dashboard e lista de tarefas */}
          
          <button onClick={handleLogout} className={styles.logoutButton}>Deslogar</button>

          {/* Link para adicionar nova tarefa, se necessário */}
          <Link href="/tasks">
              <a className={styles.addTaskButton}>Adicionar Tarefa</a>
          </Link>
        </div>
      </div>
    );
}
