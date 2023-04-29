import { Todo } from "~/typing";
import React, { useState } from "react";
import Card from "../components/Card";
import { api } from '~/utils/api'
import SearchBar from "./Search";
import Modal from "./Modal";

function TodosList() {
    const [searchRes, setSearchRes] = useState("")
    const [showModal, setShowModal] = useState<boolean>(false)
    const [taskToUpdate, setTaskToUpdate] = useState<Todo>({} as any)

    const { data: allTodos, isLoading } = api.todo.getAll.useQuery()
    const { data: searchQuery } = api.todo.searchTodo.useQuery(searchRes)

    const handleShowModal = (todo: Todo) => {
        setShowModal(true)
        setTaskToUpdate(todo)
    }

    if (isLoading) {
        return <div>Loading all the todos...</div>
    }

    return (
        <>
            {showModal && <Modal closeModal={() => setShowModal(false)} todo={taskToUpdate} />}
            <SearchBar reset={() => setSearchRes("")} handleSearch={(res: any) => {
                setSearchRes(res)
            }} />
            <div className='basis-full mt-2 grid gap-4 grid-cols-3 overflow-y-auto'>
                {
                    searchQuery && searchQuery.length ? searchQuery.map((todo: Todo) =>
                        <Card showModalToUpdate={handleShowModal} key={todo.id} todo={todo} />
                    )
                        :
                        allTodos.length ? allTodos.map((todo: Todo) =>
                            <Card showModalToUpdate={handleShowModal} key={todo.id} todo={todo} />
                        ) : <p className="text-lg font-bold mt-5">No todos yet.. Go on and add some!</p>
                }
            </div>
        </>
    )
}
export default TodosList