import { type NextPage } from "next";
import Head from "next/head";
import Form from "~/components/Form";
import TodosList from "~/components/TodoList";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Todo Application</title>
      </Head>
      <main className='h-screen w-3/4 m-auto flex flex-col text-center justify-evenly p-6'>
        <Form />
        <TodosList />
      </main>
    </>
  )

};

export default Home;
