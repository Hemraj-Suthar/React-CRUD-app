import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const List = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmpyolee = async () => {
            const allEmpyolee = await axios.get("http://localhost:5000/api/allEmployee");;
            setEmployees(allEmpyolee.data);
        }
        fetchEmpyolee();
    }, []);

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteEmployee/${id}`);
            toast.success('Employee successfully deleted!');
            setEmployees(employees.filter(employee => employee._id !== id));    
        } catch (error) {
            console.error("Error deleting employee:", error.message);
        }
    };

    return (
        <>
            <div className="text-center bg-orange-400 text-white p-4">
                <h4 className="text-2xl font-semibold">Employee List</h4>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="text-white font-bold text-lg p-4 text-center">No.</th>
                            <th className="text-white font-bold text-lg p-4 text-center">Name</th>
                            <th className="text-white font-bold text-lg p-4 text-center">Email</th>
                            <th className="text-white font-bold text-lg p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, i) => {
                            return (
                                <tr key={i} className="border-b">
                                    <td className="p-4 text-center">{i + 1}</td>
                                    <td className="p-4 text-center">{employee.name}</td>
                                    <td className="p-4 text-center">{employee.email}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <Link to={`/view/${employee._id}`}>
                                                <button className="text-blue-500 hover:text-blue-700">
                                                    View
                                                </button>
                                            </Link>
                                            <Link to={`/edit/${employee._id}`}>
                                                <button className="text-green-500 hover:text-green-700">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button onClick={() => deleteEmployee(employee._id)} className="text-red-500 hover:text-red-700">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="m-3 text-center">
                <Link to={`/`}>
                    <button className="py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Back To Home</button>
                </Link>
            </div>
        </>
    );
};

export default List;