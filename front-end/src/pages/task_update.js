import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_TASK, UPDATE_TASK } from "./gql_reqs";
import "./pages.css";

const TaskUpdate = () => {
    // Create a new task object to store the updated task
    // Currently passing empty strings to the title and description fields
    // will replace the existing values with empty strings
    const [updatedTask, setUpdatedTask] = useState({
        id: 0,
        title: "",
        description: "",
        completed: false
    });

    const { id } = useParams();
    updatedTask.id = parseInt(id);

    const [updateTask, { error, loading }] = useMutation(UPDATE_TASK, {
        variables: {
            updateTaskId: updatedTask.id,
            data: {
                title: updatedTask.title,
                description: updatedTask.description,
                completed: updatedTask.completed
            }
        },
        update(cache, { data: { updateTask } }) {
            cache.modify({
                fields: {
                    task(existingTasks = []) {
                        const newTaskRef = cache.writeFragment({
                            data: updateTask,
                            fragment: gql`
                                fragment NewTask on Task {
                                    id
                                    title
                                    description
                                    completed
                                }
                            `
                        });
                        return [...existingTasks, newTaskRef];
                    }
                }
            });
        },
        awaitRefetchQueries: true,
    });

    return (
        <>
            <h2>Update Task</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log(updatedTask);
                updateTask();
                window.location.href = "/";
            }
            }>
                <label>
                    New Title:
                    <input
                        type="text"
                        value={updatedTask.title}
                        onChange={e => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={updatedTask.description}
                        onChange={e => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                    />
                </label>
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        checked={updatedTask.completed}
                        onChange={e => setUpdatedTask({ ...updatedTask, completed: e.target.checked })}
                    />
                </label>
                <button type="submit">Update Task</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
        </>
    );
}

export default TaskUpdate;