import { type NextPage } from "next";
import Head from "next/head";
import Form from "~/components/Form";
import TodosList from "~/components/TodoList";
import Modal from "~/components/Modal";

import { api } from "~/utils/api";

const Home: NextPage = () => {

  const todos = api.todo.getAll.useQuery()

  return (
    <>
      <Head>
        <title>T3 todo-app</title>
      </Head>
      <main className='h-screen w-3/4 m-auto flex flex-col text-center justify-evenly p-6'>
        <Form />
        <TodosList />
      </main>
    </>
  )

};

export default Home;
