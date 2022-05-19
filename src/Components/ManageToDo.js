import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import AddTaskModal from './AddTaskModal';
import auth from './firebase.init';

const ManageToDo = () => {
    const [user] = useAuthState(auth);
    const [modalStatus, setModalStatus] = useState(true);
    const [myTodos, setMyTodos] = useState([]);



    // load user todo data
    useEffect(() => {
        const url = `http://localhost:5000/user-todo?email=${user.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
              return setMyTodos(data)
            })
    }, [myTodos]);

    console.log(myTodos.length);

    // delete todo task
    const handleDelete = (id) => {
        const deletePermission = window.confirm('Are you sure to delete?');
        
        if (deletePermission) {
            const url = `http://localhost:5000/todo/${id}`;
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = myTodos.filter(myTodo => myTodos._id !== id);
                    setMyTodos(remaining);

                    console.log(data);
                    if (data.deletedCount > 0) {

                        toast.success("Delete Successful !!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    else {
                        toast.error("Something went wrong !!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                })
        }
    }
    return (
        <div className='flex flex-col'>
            <h1 className='text-center text-primary mt-6 sm:xl md:2xl lg:text-3xl mb-4'>Welcome Back, <span className='uppercase'>{user ? user?.displayName : "User"}</span></h1><hr className='w-[400px] mx-auto' />


            {/* modal open btn */}
            <label htmlFor="todo-modal" className="text-white cursor-pointer text-center flex justify-center btn w-[200px] text-white mx-auto mt-5">Add Task</label>



            <div class="overflow-x-auto">
                <table class="table w-[800px] mx-auto mt-5">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Task Name</th>
                            <th>Task Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        myTodos.map((myTodo,index)=>
                            <tr key={myTodo._id}>
                                <th>{index+1}</th>
                                <td>{myTodo?.TaskName}</td>
                                <td>{myTodo?.description}</td>
                                <td>{
                                    <button onClick={() => handleDelete(myTodo?._id)} className='btn '>Delete</button>    
                                }</td>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
            </div>
            {
                modalStatus && <AddTaskModal setModalStatus={setModalStatus}></AddTaskModal>
            }

        </div>
    );
};

export default ManageToDo;