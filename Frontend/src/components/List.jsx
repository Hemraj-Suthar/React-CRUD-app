import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllStudent } from "../services/api";

const List = () => {
    const [employees, setEmployees] = useState([]);
    console.log(employees);

    useEffect(() => {
       const fetchEmpyolee = async () => {          
            const allEmpyolee = await getAllStudent();
            setEmployees(allEmpyolee);
       }
       fetchEmpyolee();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/deleteEmployee/${id}`);
        var newstudent = employees.filter((item) => {
            return item.id !== id;
        });
        setEmployees(newstudent);
    };

    return (
        <>
            <div className="text-center bg-orange-400 text-white p-4 mb-4">
                <h4 className="text-2xl">Employee List</h4>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12l4-4m0 0l-4-4m4 4H9m6 4l-4 4m0 0l4 4m-4-4h10" />
                                                    </svg>
                                                </button>
                                            </Link>
                                            <Link to={`/edit/${employee._id}`}>
                                                <button className="text-green-500 hover:text-green-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9m-9-4h9m-9-4h9m-9-4h9M3 7h.01M3 11h.01M3 15h.01M3 19h.01" />
                                                    </svg>
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDelete(employee._id)} className="text-red-500 hover:text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m2 0a2 2 0 100-4H7a2 2 0 000 4m12-2H9m-3 0a3 3 0 000-6H6m0 6a3 3 0 010-6H6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default List;
