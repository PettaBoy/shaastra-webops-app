import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS, DELETE_TASK, GET_COMPLETED_TASKS, GET_INCOMPLETE_TASKS } from './gql_reqs';
import './pages.css'

const TaskMain = () => {
    // Get all tasks and set the visibility of the completed and incomplete tasks
    const [visibleComplete, setVisibleComplete] = useState(false);
    const [visibleIncomplete, setVisibleIncomplete] = useState(false);
    const { loading, error, data } = useQuery(GET_TASKS);

    // Delete task
    // Press the delete button to delete a task and refresh the page immediately
    // to see the updated list of tasks
    const [deleteTask] = useMutation(DELETE_TASK, {
        update(cache, { data: { deleteTask } }) {
            cache.modify({
                fields: {
                    task(existingTasks = [], { readField }) {
                        return existingTasks.filter(
                            taskRef => deleteTask.id !== readField('id', taskRef)
                        );
                    }
                }
            });
        },
        awaitRefetchQueries: true,
    });

    // Get completed and incomplete tasks
    const { data: completedTasks } = useQuery(GET_COMPLETED_TASKS);
    const { data: incompleteTasks } = useQuery(GET_INCOMPLETE_TASKS);

    // Table header
    const TableHeader = () => {
        return (
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Options</th>
                </tr>
            </thead>
        )
    }

    // Show completed tasks
    const ShowCompletedTasks = () => {
        if (completedTasks.getCompletedTasks.length === 0) {
            return <p>No completed tasks</p>
        } else {
            return (
                <>
                    <h2>Completed Tasks</h2>
                    <table>
                        <TableHeader/>
                        <tbody>
                            {completedTasks.getCompletedTasks.map(({ id, title, description, completed }) => {
                                return (
                                    <tr key={id}>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>{completed.toString()}</td>
                                        <td>
                                            <Link to={`/task_update/${id}`}><button>Update</button></Link>
                                            <button onClick={() => {
                                                deleteTask({
                                                    variables: {
                                                        deleteTaskId: id
                                                    }
                                                });
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )
        }
    }
    const ToggleVisibleComplete = () => {
        setVisibleComplete(!visibleComplete);
    }

    // Show incomplete tasks
    const ShowIncompleteTasks = () => {
        if (incompleteTasks.getUncompletedTasks.length === 0) {
            return <p>No incomplete tasks</p>
        } else {
            return (
                <>
                    <h2>Incomplete Tasks</h2>
                    <table>
                        <TableHeader/>
                        <tbody>
                            {incompleteTasks.getUncompletedTasks.map(({ id, title, description, completed }) => {
                                return (
                                    <tr key={id}>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>{completed.toString()}</td>
                                        <td>
                                            <Link to={`/task_update/${id}`}><button>Update</button></Link>
                                            <button onClick={() => {
                                                deleteTask({
                                                    variables: {
                                                        deleteTaskId: id
                                                    }
                                                });
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )
        }
    }
    const ToggleVisibleIncomplete = () => {
        setVisibleIncomplete(!visibleIncomplete);
    }

    // Loading and error
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <h2>Tasks</h2>
            <Link to="/task_create"><button>Create Task</button></Link>
            <table>
                {visibleComplete ? null: visibleIncomplete ? null : <TableHeader/>}
                <tbody>
                    {visibleComplete ? null : visibleIncomplete ? null : data.task.map(({ id, title, description, completed }) => {
                        return (
                        <tr key={id}>
                            <td>{title}</td>
                            <td>{description}</td>
                            <td>{completed.toString()}</td>
                            <td>
                                <Link to={`/task_update/${id}`}><button>Edit</button></Link>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    deleteTask({ variables: { deleteTaskId: parseFloat(id) } });
                                }}>Delete</button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <button onClick={(e) => {
                e.preventDefault();
                ToggleVisibleComplete();
            }}>Completed Tasks</button>
            <button onClick={(e) => {
                e.preventDefault();
                ToggleVisibleIncomplete();
            }}>Incomplete Tasks</button>
            {visibleComplete ? <ShowCompletedTasks /> : null}
            {visibleIncomplete ? <ShowIncompleteTasks /> : null}
        </>
    );
}

export default TaskMain;