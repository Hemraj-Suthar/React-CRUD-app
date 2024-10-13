import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: "",
        email: ""
    });

    function inputChange(e) {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        async function getEmployee() {
            try {
                const response = await axios.get(`http://localhost:5000/api/Employee/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.log("Something is Wrong", error);
            }
        }
        getEmployee();
    }, []);

    async function formSubmit(e) {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/Employee/${id}`, employee);
        toast.success('Employee successfully updated!');
        navigate("/");
    }

    function handleClick() {
        navigate("/employeeList");
    }

    return (
        <>
            <div className="text-center bg-purple-600 text-white p-4 mb-4">
                <h2 className="text-4xl">React CRUD Opertaion</h2>
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="text-center bg-green-600 text-white p-4">
                        <h4 className="text-2xl">Edit Employee</h4>
                    </div>
                    <form className="p-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                                <input type="text" name="id" id="id" value={id} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="name" id="name" value={employee.name} onChange={e => inputChange(e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" id="email" value={employee.email} onChange={e => inputChange(e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="button" onClick={e => formSubmit(e)} className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <button onClick={handleClick} className="py-2 px-4 bg-gray-600 text-white font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Back to Employee List
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit;