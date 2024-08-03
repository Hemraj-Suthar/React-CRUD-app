import axios from "axios"

const getAllStudent = async () => {
    try {
        const empyolees = await axios.get("http://localhost:5000/api/allEmpyolee");
        // console.log(empyolees.data);
        return empyolees.data;
    } catch (error) {
        console.log("Something is Wrong", error);
    }
}

const handleDelete = async (id) => {
    try {
        const empyolees = await axios.delete(`http://localhost:5000/api/deleteEmpyolee/:${id}`);
        return empyolees.data;
    } catch (error) {
        console.log("Something is Wrong", error);
    }
}

export { getAllStudent, handleDelete };