'use client'
import React, { FormEvent, useState } from 'react'

interface ISearchBar {
    handleSearch: (query: string) => void,
    reset: () => void
}

const SearchBar = ({ handleSearch, reset }: ISearchBar) => {

    const [query, setQuery] = useState<string>("")

    return (
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            handleSearch(query)
            setQuery("")
        }} className='mt-6 flex flex-row items-center w-3/5 m-auto '>
            <input
                className="px-5 py-1 w-3/5 sm:px-5 sm:py-3 flex-1 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="What are you searching for?"
                value={query || ""}
                onChange={e => setQuery(e.target.value)}
            />
            <button type='submit' className='m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Search</button>
            <button type='button' onClick={reset} className='m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Reset</button>
        </form>
    )
}

export default SearchBar