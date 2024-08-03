import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true},
    },
    {
        timestamps: true
    }
)

const employee = mongoose.model("employee", employeeSchema);

export default employee;