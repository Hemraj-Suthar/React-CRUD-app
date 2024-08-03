import express from 'express';
import mongoose from 'mongoose';
import employee from '../model/schema.js';

const router = express.Router();

// GET route to fetch all employees
router.get("/allEmpyolee", async (req, res) => {
    try {
        const response = await employee.find();
        res.json(response);
        // res.send(response.json());
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// GET route to fetch a single employee by ID
router.get("/Employee/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await employee.findById(id);

        if (!response) {
            return res.status(404).send({ message: "Employee not found" });
        }

        res.json(response); 
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// POST route to add a new employee
router.post("/addEmployee", async (req, res) => {
    const { name, email } = req.body;
    const employeeData = new employee({
        name: name,
        email: email
    });
    
    try {
        const savedEmployee = await employeeData.save();
        res.status(201).send(savedEmployee);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

// PUT route to update an employee by ID
router.put("/Employee/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedEmployee = await employee.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true }
        );
    
        if (!updatedEmployee) {
            return res.status(404).send({ message: "Employee not found" });
        }
    
        res.send(updatedEmployee);
    } catch (error) {
        res.status(400).send({message: error.message});
    }

});

router.delete("/deleteEmpyolee/:id", async (req, res) => {
   const { id } = req.params;

   try {
        const deletedEmployee = await employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).send({message: "Employee not found"});
        }
        req.send({message: "Employee deleted successfully"});
   } catch (error) {
        res.status(500).send({ message: error.message });
   }
});

export default router;