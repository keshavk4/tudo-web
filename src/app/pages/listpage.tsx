"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/app/pages/components/taskcard";

type taskTypes = {
    _id: string;
    user_id: string;
    task: string;
}

export default function ListPage(props: { user_id: string }) {
    const [taskToAdd, setTaskToAdd] = useState<string>();
    const [taskToEdit, setTaskToEdit] = useState<taskTypes>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [tasks, setTasks] = useState<taskTypes[]>();

    /**
     * Fetches tasks from the server based on the user ID.
     */
    const fetchTasks = async () => {
        const res = await fetch(`/api/task?user_id=${props.user_id}`);
        const data = await res.json();
        setTasks(data.tasks);
    }

    /**
     * Handles the change event of the input field for editing a task.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
     */
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskToEdit((prev: any) => ({
            ...prev,
            task: e.target.value
        }));
    }

    /**
     * Handles adding a task.
     */
    const handleAdd = async () => {
        const res = await fetch(`/api/task?user_id=${props.user_id}&task=${taskToAdd}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: props.user_id, task: taskToAdd })
        });
        setTaskToAdd("");
        fetchTasks();
    }

    /**
     * Handles the edit action for a task.
     * @param _id - The ID of the task.
     * @param task - The task to be edited.
     */
    const handleEdit = async (_id: string, task: string) => {
        setIsEditing(true);
        setTaskToEdit({ _id: _id, user_id: props.user_id, task: task });
    };

    /**
     * Handles the update of a task.
     * Sends a PUT request to the server to update the task with the provided ID and task content.
     * After the update, fetches the updated list of tasks and sets the editing state to false.
     */
    const handleUpdate = async () => {
        const res = await fetch(`/api/task`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: taskToEdit?._id, task: taskToEdit?.task })
        });
        fetchTasks();
        setIsEditing(false);
    };


    /**
     * Handles the deletion of a task.
     * @param _id - The ID of the task to be deleted.
     */
    const handleDelete = async (_id: string) => {
        setTasks(tasks?.filter(task => task._id !== _id));
        const res = await fetch(`/api/task?user_id=${props.user_id}&_id=${_id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: _id })
            });
    };

    useEffect(() => {
        fetchTasks();
    }, [])

    return (
        <section className="w-max mt-20 mx-auto px-12 py-10 text-center bg-indigo-200 rounded-lg">
            <span className="font-bold text-xl">
                Get Things Done!
            </span>
            <br /><br />
            <div className="flex border-blue-500 border-2">
                <input type="text" name="task" id="task" placeholder="What is the task?" className="px-2 bg-transparent focus:outline-none" value={taskToAdd} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTaskToAdd(e.target.value) }} />
                {
                    <button className="block ml-auto py-2 px-4 bg-blue-500 text-white" onClick={handleAdd}>Add Task</button>
                }
            </div>
            <br />
            {
                tasks?.map((task: taskTypes, index: number) => (
                    <span key={index}>
                        <TaskCard key={index} task={task.task} onDelete={() => handleDelete(task._id)} onEdit={() => handleEdit(task._id, task.task)} />
                        <br />
                    </span>
                ))
            }
            {
                isEditing ? <div className="flex border-blue-500 border-2 mt-6">
                    <input type="text" name="task" id="task" placeholder="Edit your task" className="px-2 bg-transparent focus:outline-none" value={taskToEdit?.task} onChange={handleEditInputChange} />
                    <button className="block ml-auto py-2 px-4 bg-blue-500 text-white" onClick={handleUpdate}>Update Task</button>
                    <button className="block ml-auto py-2 px-4 border-l-2 bg-blue-500 text-white" onClick={() => setIsEditing(false)}>Cancel</button>
                </div> : null
            }
        </section>
    );
}