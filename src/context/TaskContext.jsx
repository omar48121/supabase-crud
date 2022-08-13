import { createContext, useContext, useState } from "react";
import { client } from "../supabase/client";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaks must be used within a TaskContextProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const user = client.auth.user();

    const { data, error } = await client
      .from("tasks")
      .select()
      .eq("userID", user.id)
      .eq("done", done)
      .order("id", { ascending: true });

    if (error) throw error;

    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);

    try {
      const user = client.auth.user();
      const { data, error } = await client
        .from("tasks")
        .insert([{ name: taskName, userID: user.id }]);

      if (error) throw error;

      setTasks([...tasks, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    const user = client.auth.user();

    const { data, error } = await client
      .from("tasks")
      .delete()
      .match({ userID: user.id, id });

    if (error) throw error;

    setTasks(tasks.filter((task) => task.id != id));
  };

  const updateTask = async (id, updateFields) => {
    const user = client.auth.user();

    const { data, error } = await client
      .from("tasks")
      .update(updateFields)
      .match({ id, userID: user.id });

    if (error) throw error;

    setTasks(tasks.filter((task) => task.id !== id))
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        deleteTask,
        updateTask,
        adding,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
