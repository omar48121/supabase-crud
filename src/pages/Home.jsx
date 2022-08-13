import { client } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

export const Home = () => {
  const [showTaskDone, setShowTaskDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!client.auth.user()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      Home
      <button onClick={() => client.auth.signOut()}>Logout</button>
      <TaskForm />
      <header>
        <h3>My tasks</h3>
        <button onClick={() => setShowTaskDone(!showTaskDone)}>
          {!showTaskDone ? "Show tasks done" : "Show pending tasks"}
        </button>
      </header>
      <TaskList done={showTaskDone} />
    </div>
  );
};
