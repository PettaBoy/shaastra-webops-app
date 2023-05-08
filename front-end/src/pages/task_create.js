import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { CREATE_TASK } from "./gql_reqs";
import "./pages.css";

const TaskCreate = () => {
    // Create a new task object to store the new task
    const [task, setTask] = useState({
        title: "",
        description: "",
        completed: false
    });

    // Create the new task
    const [createTask, { error, loading }] = useMutation(CREATE_TASK, {
        variables: {
            data: {
                title: task.title,
                description: task.description,
                completed: task.completed
            }
        },
        readQuery: gql`
            query GetAllTasks {
                task {
                    id
                    title
                    description
                    completed
                }
            }
        `,
        awaitRefetchQueries: true,
    });

    return (
        <>
            <h2>Create Task</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                createTask();
                window.location.href = "/";
            }}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={task.title}
                        onChange={e => setTask({ ...task, title: e.target.value })}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={task.description}
                        onChange={e => setTask({ ...task, description: e.target.value })}
                    />
                </label>
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={e => setTask({ ...task, completed: e.target.checked })}
                    />
                </label>
                <button type="submit">Add Task</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
        </>
    );
}

export default TaskCreate;