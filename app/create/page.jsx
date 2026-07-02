"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./create.module.css";

const createTask = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) return;

    const respone = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (respone.ok) {
      router.push("/");
    } else {
      alert("Failed to create task");
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Create Task</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
        />
        <button className={styles.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default createTask;
