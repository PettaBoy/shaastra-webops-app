import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import Task from './model_task';
import { CreateNewTask, UpdateTask } from './control_task';

@Resolver(Task)
export class TaskResolver {
    @Query(() => [Task])
    task() {
        return Task.find({});
    }

    @Mutation(() => Task)
    async createTask(@Arg("data") data: CreateNewTask) {
        const task = await Task.create({...data}).save();
        return task;
    }

    @Query(() => Task)
    async getTask(@Arg("id") id: number) {
        return await Task.findOne({ where: { id } });
    }

    @Mutation(() => Task)
    async updateTask(@Arg("id") id: number, @Arg("data") data: UpdateTask) {
        const task = await Task.findOne({ where: { id } });
        if (!task) throw new Error("Task not found!");
        Object.assign(task, data);
        await task.save();
        return task;
    }

    @Mutation(() => Boolean)
    async deleteTask(@Arg("id") id: number) {
        const task = await Task.findOne({ where: { id } });
        if (!task) throw new Error("Task not found!");
        await task.remove();
        return true;
    }

    @Query(() => [Task])
    async getCompletedTasks() {
        return await Task.find({ where: { completed: true } });
    }

    @Query(() => [Task])
    async getUncompletedTasks() {
        return await Task.find({ where: { completed: false } });
    }
}