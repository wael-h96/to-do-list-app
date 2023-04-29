import { Todo } from "~/typing";
import React, { useState } from "react";
import Card from "../components/Card";
import { api } from '~/utils/api'
import SearchBar from "./Search";
import Modal from "./Modal";


function TodosList() {

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false)
    const [taskToUpdate, setTaskToUpdate] = useState<Todo>()

    const { data: allTodos } = api.todo.getAll.useQuery()
    const { data: searchResponse } = api.todo.searchTodo.useQuery(searchQuery)

    const handleShowModal = (todo: Todo) => {
        setShowModal(true)
        setTaskToUpdate(todo)
    }

    const handleSearchQuery = (searchQuery: string) => {
        setSearchQuery(searchQuery)
    }

    const handleReset = () => {
        setSearchQuery("")
    }

    return (
        <>
            {showModal && <Modal closeModal={() => setShowModal(false)} todo={taskToUpdate} />}
            <SearchBar reset={handleReset} handleSearch={handleSearchQuery} />
            <div className='basis-full mt-2 grid gap-4 grid-cols-3 overflow-y-auto'>
                {
                    searchResponse?.length ? searchResponse.map((todo) =>
                        <Card showModalToUpdate={handleShowModal} key={todo.id} todo={todo as Todo} />
                    )
                        :
                        allTodos?.length ? allTodos.map((todo) =>
                            <Card showModalToUpdate={handleShowModal} key={todo.id} todo={todo as Todo} />
                        ) : <p className="text-lg font-bold mt-5">No todos yet.. Go on and add some!</p>
                }
            </div>
        </>
    )
}
export default TodosList