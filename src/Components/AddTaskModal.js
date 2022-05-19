import React from 'react';
import { useForm } from 'react-hook-form';
import auth from './firebase.init';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';


const AddTaskModal = ({setModalStatus}) => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        const todoTask ={
            ...data,email:user.email
        }
        console.log(todoTask);
        setModalStatus(false)

        //send data to server//

        fetch('http://localhost:5000/add-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoTask),
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
                if (data.insertedId) {

                    toast.success("Add Successful !!", {
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
    return (
        <div>

            <input type="checkbox" id="todo-modal" className="modal-toggle" />
            <div className="modal modal-middle sm:modal-middle">
                <div className="modal-box">
                    <div className='flex justify-center items-start'>
                        <label htmlFor="todo-modal" className="btn btn-sm btn-circle absolute right-2 top-2 mt-3">✕</label>
                        <h3 className="font-bold text-lg">Add Your Task Below</h3><hr />
                    </div>
                    <hr className='w-40 mt-2 text-center mx-auto' />

                    

                    <div className='text-center mt-5'>

                        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 '>

                            {/* task name */}
                            <div className="form-control w-full max-w-xs text-center mx-auto">
                                <label className="label pb-1 pl-0">
                                    <span className="label-text ">Task Name</span>
                                </label>
                                <input {...register('TaskName', {
                                    required: {
                                        value: true,
                                        message: 'Task Name is required'
                                    },
                                   
                                })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                {errors.name?.type === 'required' &&
                                    <span className="label-text-alt text-red-500 text-left"> {errors?.name?.message}</span>
                                }
                               
                            </div>

                            {/* task descriptions */}
                            <div className="form-control w-full max-w-xs text-center mx-auto">
                                <label className="label pb-1 pl-0">
                                    <span className="label-text ">Task Descriptions</span>
                                </label>
                                <input {...register('description', {
                                    required: {
                                        value: true,
                                        message: 'Description is required'
                                    },
                                   
                                })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                {errors.description?.type === 'required' &&
                                    <span className="label-text-alt text-red-500 text-left"> {errors?.description?.message}</span>
                                }
                                
                            </div>

                            <button type='submit' className="btn mt-4">Add Task</button>

                        </form>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default AddTaskModal;