// src/app/page.tsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import AddTodo from '@/containers/AddTodo';
import TodoList from '@/containers/TodoList';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useMutation } from '@apollo/client';
import { GETQUERY, ADDMUT, DELETEMUT } from '@/query/schema';

export default function Todo() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState('');
  const [createTodo] = useMutation(ADDMUT);
  const [deleteMUT] = useMutation(DELETEMUT);
  const { loading, error, data } = useQuery(GETQUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      id: 1
    }
  }); //Fetching all todos

  useEffect(() => {
    console.log(session);
    setTodos(data?.usersPermissionsUser?.data?.attributes?.todos?.data);
    setUser(session?.user?.name.split(' ')[0]); //Storing the user name
  }, [data, session]);

  const addTodo = async todoText => {
    await createTodo({
      //Creating a new todo
      variables: {
        todoText: todoText,
        user: 1 //Passing the todo text
      }
    }).then(({ data }) => {
      console.log(data);
      setTodos([...todos, data?.createTodo?.data]); //Adding the new todo to the list
    });
  };
  const deleteTodoItem = async todo => {
    if (confirm('Do you really want to delete this item?')) {
      console.log(todo);
      await deleteMUT({
        //Deleting the todo
        variables: {
          id: todo.id
        }
      }).then(({ data }) => {
        const newTodos = todos.filter(_todo => _todo.id !== todo.id);
        setTodos(newTodos);
      });
    }
  };

  return (
    <div>
      <main className="main">
        {console.log(session?.user?.image)}
        <Image
          src={session?.user?.image}
          width={50}
          height={50}
          alt="Picture"
        />
        <div className="header">
          <h2>{user} To-do app</h2>
        </div>
        <button onClick={signOut}>Logout</button>
        <AddTodo addTodo={addTodo} />
        <TodoList todos={todos} deleteTodoItem={deleteTodoItem} />
      </main>
    </div>
  );
}
