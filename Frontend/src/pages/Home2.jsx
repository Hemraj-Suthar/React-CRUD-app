import React, { useState } from 'react';

function Home() {
    const [inputs, setInputs] = useState({});
    const { name, email, rollNo } = inputs
    const [formData, setFormData] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData({ ...formData, inputs })
    }

    return (
        <>
            <div className='w-full'>
                <h1 className='text-center text-4xl font-extrabold text-white bg-slate-700 p-5'>React CRUD Operation</h1>
                <div className='flex'>
                    <form onSubmit={handleSubmit} className='w-1/2'>
                        <h2 className='text-center text-3xl font-bold text-white bg-green-500 p-5'>Add Employee</h2>
                        <div className='bg-gray-300 p-4'>
                            <label className="input focus:outline-none focus:border-none flex items-center gap-2"> Name
                                <input type="text" className="grow" name='name' value={name} onChange={handleChange} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2"> Email
                                <input type="text" className="grow" name='email' value={email} onChange={handleChange} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2"> Roll no.
                                <input type="number" className="grow" name='rollNo' value={rollNo} onChange={handleChange} />
                            </label>
                        </div>
                    </form>
                    <div className="w-1/2 overflow-x-auto">
                        <h2 className='text-center text-3xl font-bold text-white bg-blue-600 p-5'>Employee List</h2>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th><label><input type="checkbox" className="checkbox" /></label></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Roll no.</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.map((item, index) => (
                                    <tr key={index}>
                                        <th><label><input type="checkbox" className="checkbox" /></label></th>
                                        <th>{item.name}</th>
                                        <th>{item.email}</th>
                                        <th>{item.rollNo}</th>
                                        <th>
                                            <button type="button" onClick={handleEdit(index)}>Edit</button>
                                            <button type="button" onClick={handleDelete(index)}>Delete</button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;

// {/* row 1 */}
// <tr>
// <th>
//     <label>
//         <input type="checkbox" className="checkbox" />
//     </label>
// </th>
// <td>
//     <div className="flex items-center gap-3">
//         <div className="avatar">
//             <div className="mask mask-squircle h-12 w-12">
//                 <img
//                     src="https://img.daisyui.com/images/profile/demo/2@94.webp"
//                     alt="Avatar Tailwind CSS Component" />
//             </div>
//         </div>
//         <div>
//             <div className="font-bold">Hart Hagerty</div>
//             <div className="text-sm opacity-50">United States</div>
//         </div>
//     </div>
// </td>
// <td>
//     Zemlak, Daniel and Leannon
//     <br />
//     <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
// </td>
// <td>Purple</td>
// <th>
//     <button className="btn btn-ghost btn-xs">details</button>
// </th>
// </tr>
// {/* row 2 */}
// <tr>
// <th>
//     <label>
//         <input type="checkbox" className="checkbox" />
//     </label>
// </th>
// <td>
//     <div className="flex items-center gap-3">
//         <div className="avatar">
//             <div className="mask mask-squircle h-12 w-12">
//                 <img
//                     src="https://img.daisyui.com/images/profile/demo/3@94.webp"
//                     alt="Avatar Tailwind CSS Component" />
//             </div>
//         </div>
//         <div>
//             <div className="font-bold">Brice Swyre</div>
//             <div className="text-sm opacity-50">China</div>
//         </div>
//     </div>
// </td>
// <td>
//     Carroll Group
//     <br />
//     <span className="badge badge-ghost badge-sm">Tax Accountant</span>
// </td>
// <td>Red</td>
// <th>
//     <button className="btn btn-ghost btn-xs">details</button>
// </th>
// </tr>
// {/* row 3 */}
// <tr>
// <th>
//     <label>
//         <input type="checkbox" className="checkbox" />
//     </label>
// </th>
// <td>
//     <div className="flex items-center gap-3">
//         <div className="avatar">
//             <div className="mask mask-squircle h-12 w-12">
//                 <img
//                     src="https://img.daisyui.com/images/profile/demo/4@94.webp"
//                     alt="Avatar Tailwind CSS Component" />
//             </div>
//         </div>
//         <div>
//             <div className="font-bold">Marjy Ferencz</div>
//             <div className="text-sm opacity-50">Russia</div>
//         </div>
//     </div>
// </td>
// <td>
//     Rowe-Schoen
//     <br />
//     <span className="badge badge-ghost badge-sm">Office Assistant I</span>
// </td>
// <td>Crimson</td>
// <th>
//     <button className="btn btn-ghost btn-xs">details</button>
// </th>
// </tr>
// {/* row 4 */}
// <tr>
// <th>
//     <label>
//         <input type="checkbox" className="checkbox" />
//     </label>
// </th>
// <td>
//     <div className="flex items-center gap-3">
//         <div className="avatar">
//             <div className="mask mask-squircle h-12 w-12">
//                 <img
//                     src="https://img.daisyui.com/images/profile/demo/5@94.webp"
//                     alt="Avatar Tailwind CSS Component" />
//             </div>
//         </div>
//         <div>
//             <div className="font-bold">Yancy Tear</div>
//             <div className="text-sm opacity-50">Brazil</div>
//         </div>
//     </div>
// </td>
// <td>
//     Wyman-Ledner
//     <br />
//     <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
// </td>
// <td>Indigo</td>
// <th>
//     <button className="btn btn-ghost btn-xs">details</button>
// </th>
// </tr>