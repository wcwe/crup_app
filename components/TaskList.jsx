"use client";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { Tasksdata } from "@/app/api/tasks/data";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks", {
          cache: "no-store",
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (!confirm("Are you sure want to delete this task?")) {
      return;
    }
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });

      if (response.ok) {
        //Remove the deleted task from the state
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <p>Loading tasks....</p>;
  }

  return (
    <div className={styles.main}>
      <h1>Task List</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li className={styles.task} key={task.id}>
              {task.title} - <Link className={styles.editButton} href={`/edit/${task.id}`}>Edit 🔧</Link>
              <button className={styles.deleteButton} onClick={() => handleDelete(task.id)}>Delete 🗑️</button>
            </li>
          ))
        ) : (
          <li>No tasks found</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
