export default function Task({ task, onDelete, onToggle }) {
    return (
        <div>
            <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => onToggle(task.id)} 
            />
            <span>{task.title}</span>
            <button onClick={() => onDelete(task.id)}>Excluir</button>
        </div>
    );
  }