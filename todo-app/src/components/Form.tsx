import { FormEvent, useEffect, useState } from "react"
import { Todo } from "~/typing"
import { api } from "~/utils/api"

interface IForm {
    todo?: Todo,
    close?: () => void
}

const Form: React.FC<IForm> = ({ todo, close }) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [status, setStatus] = useState<boolean>(false)

    const trpc = api.useContext()
    const { mutate: addMutate } = api.todo.addTodo.useMutation({
        onSettled: async () => {
            await trpc.todo.getAll.invalidate()
        }
    })

    const { mutate: updateMutate } = api.todo.updateTodo.useMutation({
        onSettled: async () => {
            await trpc.todo.getAll.invalidate()
        }
    })

    useEffect(() => {
        if (todo) {
            setTitle(todo.title)
            setDescription(todo.description)
            setStatus(todo.status)
        }
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!todo) {
            addMutate({ title, description })
        }
        else {
            updateMutate({ title, description, id: todo.id, status })
            close?.()
        }
        setTitle("")
        setDescription("")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col border-b-2 border-indigo-200 pb-1 shadow-xl">
            {
                todo &&
                <div className="flex items-center justify-between pl-2 border border-gray-200 w-6/12 m-auto mb-5 rounded">
                    <input onChange={() => setStatus(!status)} id="bordered-checkbox-1" type="checkbox" checked={status} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="w-full py-4 ml-2 text-sm font-medium">Mark as done</label>
                </div>
            }
            <div>
                <label htmlFor="message" className="mb-2 text-sm font-medium text-black-900 dark:text-black">Task title</label>
                <input required defaultValue={todo?.title || title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter title.." className="block p-2.5 w-6/12 m-auto text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-black-900 dark:text-black">Task description</label>
                <textarea required defaultValue={todo?.description || description} onChange={(e) => setDescription(e.target.value)} id="message" rows={4} className="block p-2.5 w-6/12 m-auto text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter description..."></textarea>
            </div>

            <button type="submit" className='mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent roundedfont-bold py-2 px-4 rounded w-6/12 self-center'>{todo ? "Save Changes" : "Add Task"}</button>
        </form>
    )
}

export default Form