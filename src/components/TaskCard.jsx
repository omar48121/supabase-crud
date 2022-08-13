import { useTask } from "../context/TaskContext";

export const TaskCard = ({ task }) => {
  const { deleteTask, updateTask } = useTask();

  const handleDelete = () => {
    deleteTask(task.id);
  };
  const handleToggleDone = () => {
    updateTask(task.id, {done: !task.done})
  };

  return (
    <div style={{ border: "1px solid white" }}>
      <p>{task.name}</p>
      <p>{task.done.toString()}</p>
      <div>
        <button onClick={handleToggleDone}>Done</button>
        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
};
