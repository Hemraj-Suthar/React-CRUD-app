import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [student, setStudent] = useState({
        stuname: "",
        email: ""
    });

    useEffect(() => {
        async function getStudent() {
            try {
                const student = await axios.get(`http://localhost:3333/students/${id}`);
                setStudent(student.data);
            } catch (error) {
                console.log("Something is Wrong");
            }
        }
        getStudent();
    }, [id]);

    function onTextFieldChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3333/students/${id}`, student);
            history.push("/");
        } catch (error) {
            console.log("Something is Wrong");
        }
    }

    function handleClick() {
        history.push("/");
    }

    return (
        <>
            <div className="text-center p-4 bg-purple-600 text-white mb-4">
                <h2 className="text-4xl">React CRUD with API Call</h2>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="text-center p-4 bg-green-600 text-white mb-4">
                        <h4 className="text-2xl">Edit Student</h4>
                    </div>
                    <form>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
                                <input type="text" name="id" id="id" value={id} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="stuname" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" name="stuname" id="stuname" value={student.stuname} onChange={e => onTextFieldChange(e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" name="email" id="email" value={student.email} onChange={e => onTextFieldChange(e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="button" onClick={e => onFormSubmit(e)} className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <button onClick={handleClick} className="py-2 px-4 bg-gray-600 text-white font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Back to Home</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;
