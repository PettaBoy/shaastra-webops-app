import { gql } from '@apollo/client';

const GET_TASKS = gql`
    query GetAllTasks {
        task {
            id
            title
            description
            completed
        }
    }
`;

const GET_TASK = gql`
    query GetTask($getTaskId: Float!) {
        getTask(id: $getTaskId) {
            id
            title
            description
            completed
        }
    }
`;

const CREATE_TASK = gql`
    mutation CreateTask($data: CreateNewTask!) {
        createTask(data: $data) {
            id
            title
            description
            completed
        }
    }
`;

const UPDATE_TASK = gql`
    mutation UpdateTask($updateTaskId: Float!, $data: UpdateTask!) {
        updateTask(data: $data, id: $updateTaskId) {
            id
            title
            description
            completed
        }
    }
`;

const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: Float!) {
        deleteTask(id: $deleteTaskId)
    }
`;

const GET_COMPLETED_TASKS = gql`
    query GetCompletedTasks {
        getCompletedTasks {
            id
            title
            description
            completed
        }
    }
`;

const GET_INCOMPLETE_TASKS = gql`
    query GetUncompletedTasks {
        getUncompletedTasks {
            id
            title
            description
            completed
        }
    }
`;

export { GET_TASKS, CREATE_TASK, GET_TASK, UPDATE_TASK, DELETE_TASK, GET_COMPLETED_TASKS, GET_INCOMPLETE_TASKS };