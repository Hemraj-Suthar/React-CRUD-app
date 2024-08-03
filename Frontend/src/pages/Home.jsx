import axios from "axios";
import { useState } from "react";
import List from "../components/List";

const Home = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: ""
    });

    const [status, setStatus] = useState();

    function inputChange(e) {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    async function formSubmit(e) {
        e.preventDefault();
        console.log(employee);
        try {
            await axios.post(`http://localhost:5000/api/addEmployee`, employee);
            setStatus(true);
        } catch (error) {
            console.log("Something is Wrong", error.message);
        }
    }

    if (status) {
        return <Home />;
    }

    return (
        <>
            <div className="text-center bg-purple-400 text-white p-4 mb-4">
                <h2 className="text-4xl">React CRUD Opertaion</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="w-full md:w-1/2">
                    <div className="text-center bg-green-400 text-white p-4 mb-4">
                        <h4 className="text-2xl">Add Employee</h4>
                    </div>
                    <form noValidate onSubmit={formSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Employee Name</label>
                                <input type="text" name="name" id="name" autoComplete="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" onChange={inputChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" id="email" autoComplete="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Add</button>
                        </div>
                    </form>
                </div>

                <div className="w-full md:w-1/2">
                    <List />
                </div>
            </div>
        </>
    );
};

export default Home;
