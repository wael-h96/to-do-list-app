import React from "react"
import { Todo } from "~/typing"
import { api } from "~/utils/api"

interface ICard {
    todo: Todo,
    showModalToUpdate: (todo: Todo) => void
}

const Card: React.FC<ICard> = ({ todo, showModalToUpdate }) => {
    const { id, title, description, status, created_at, updated_at } = todo

    const trpc = api.useContext()

    const { mutate } = api.todo.deleteTodo.useMutation({
        onSettled: async () => {
            await trpc.todo.getAll.invalidate()
        }
    })

    const handleDelete = () => {
        console.log(id)
        mutate(id)
    }

    return (
        <div className="flex flex-col justify-between mt-2 w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-2 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="underline mb-2 text-xl font-bold text-gray-800 dark:text-white">{title} <p className="text-sm bg-red-200 m-2 text-black">{status ? "Completed" : "Pending"}</p></h5>
            <div>
                <p className="mb-2 text-white text-sm">{description}</p>
            </div>
            <div className="flex flex-row justify-between items-end w-full">
                <div className="text-center self-center text-white text-xs">
                    <p>created - {`${created_at.getHours()}:${created_at.getMinutes()}`}</p>
                    {
                        updated_at ? <p>updated - {`${updated_at.getHours()}:${updated_at.getMinutes()}`}</p>
                            :
                            null
                    }
                </div>
                <div className="items-center">
                    <button onClick={handleDelete} className="m-1 bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Delete</button>
                    <button onClick={() => showModalToUpdate(todo)} className="m-1 bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Update</button>
                </div>
            </div>
        </div>
    )
}

export default Card