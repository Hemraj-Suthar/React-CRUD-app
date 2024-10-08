import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const View = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    
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
    },[id]);

    const handleClick = () => {
        navigate("/");
    }

    return (
        <>
            <div className="text-center bg-orange-400 text-white p-4">
                <h4 className="text-2xl">Employee Details</h4>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Id No.</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Created at</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white divide-y divide-gray-200">
                            <td className="px-6 py-4 text-center whitespace-nowrap">{employee._id}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">{employee.name}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">{employee.email}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap uppercase">{new Date(employee.createdAt).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap uppercase">{new Date(employee.updatedAt).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</td>
                        </tr>                          
                    </tbody>
                </table>
                <div className="m-3 text-center">
                    <button className="py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleClick}>Back To Home</button>
                </div>
            </div>
        </>
    )
}

export default View;