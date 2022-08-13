import { useTask } from "../context/TaskContext";
import { useEffect } from "react";
import { TaskCard } from "./TaskCard";

export const TaskList = ({done = false}) => {
  const { tasks, getTasks, loading } = useTask();

  useEffect(() => {
    getTasks(done);
  }, [done]);

  const renderTask = () => {
    if (loading) {
      return <p>Loading...</p>;
    } else if (tasks.length === 0) {
      return <p>No tasks found</p>;
    } else {
      return (
        <div>
          {tasks
            .slice(0)
            .reverse()
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      );
    }
  };

  return <>{renderTask()}</>;
};
