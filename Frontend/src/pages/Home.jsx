import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import List from "./List";
import toast from 'react-hot-toast';

const Home = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        gender: "",
        employee_image: null
    });

    const [status, setStatus] = useState();
    
    const inputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'employee_image') {
            setEmployee({ ...employee, [name]: files[0] });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    async function formSubmit(e) {
        e.preventDefault();
        console.log('Employee detail:', employee);
        if (employee.name != '' && employee.email != '' && employee.gender != '' && employee.employee_image != null) {
            try {
                const formData = new FormData();
                formData.append('name', employee.name);
                formData.append('email', employee.email);
                formData.append('gender', employee.gender);
                formData.append('employee_image', employee.employee_image); // Add the file object
    
                // Send the data using axios, with headers set for 'multipart/form-data'
                await axios.post('http://localhost:5000/api/addEmployee', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Employee successfully added!');
                setStatus(true);
            } catch (error) {
                console.log("Something is Wrong", error.message);
            }
        } else {
            toast.error('Please enter vaild input!');
        }
    }

    if (status) {
        return <Home />;
    }

    return (
        <div className="">
            <div className="text-center bg-purple-400 text-gray p-4">
                <h2 className="text-4xl font-bold">React CRUD Opertaion</h2>
            </div>
            {/* <div className="flex flex-col md:flex-row justify-center">
                <div className="w-full"> */}
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="text-center bg-green-400 text-white p-4">
                        <h4 className="text-2xl font-semibold">Add Employee</h4>
                    </div>
                    <form noValidate onSubmit={formSubmit} className="p-4" encType="multipart/form-data">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Employee Name</label>
                                <input type="text" name="name" id="name" autoComplete="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" onChange={inputChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" id="email" autoComplete="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" onChange={inputChange} />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                <select name="gender" id="gender" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" onChange={inputChange}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="transgender">Transgender</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="employee_image" className="block text-sm font-medium text-gray-700">Employee Image</label>
                                <input type="file" name="employee_image" id="employee_image" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" onChange={inputChange}
                                    accept="image/*" // Restrict to image file types
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Add</button>
                        </div>
                        <div className="mt-6">
                            <Link to={`/employeeList`}>
                                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                                    Employee List
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>

                {/* <div className="w-full md:w-1/2">
                    <List />
                </div> */}
            </div>
        </div>
    );
};

export default Home;
