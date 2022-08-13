import { useState } from "react";
import { useTask } from "../context/TaskContext";

export const TaskForm = () => {
  const [taskName, setTaskName] = useState("");

  const { createTask, adding } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskName);
    setTaskName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
          type="text"
          name="taskName"
          placeholder="Write your task"
          value={taskName}
        />
        <button disabled={adding}>{adding ? "Loading..." : "Save"}</button>
      </form>
    </div>
  );
};
