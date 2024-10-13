import express from 'express';
import multer from 'multer';
import path from 'path';
import employee from '../model/schema.js';

const router = express.Router();

// GET route to fetch all employees
router.get("/allEmployee", async (req, res) => {
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads/')); // Adjusted to use path.join for better path handling
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Define the file name
    },
});

const upload = multer({ storage });

// POST route to add a new employee
router.post("/addEmployee", upload.single('employee_image'), async (req, res) => {
    console.log('File:', req.file);

    if (!req.file) {
        return res.status(400).send({ message: 'File not uploaded' });
    }

    const employeeRowData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        employee_image: req.file.path,
    };

    const employeeData = new employee(employeeRowData);
    
    try {
        const savedEmployee = await employeeData.save();
        res.status(201).send(savedEmployee);
    } catch (error) {
        res.status(400).send({ message: error.message });
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

router.delete("/deleteEmployee/:id", async (req, res) => {
   const { id } = req.params;

   try {
        const deletedEmployee = await employee.findByIdAndDelete(id);
        console.log(deletedEmployee);
        
        if (!deletedEmployee) {
            return res.status(404).send({message: "Employee not found"});
        }
        res.send({message: "Employee deleted successfully"});
   } catch (error) {
        res.status(500).send({ message: error.message });
   }
});

export default router;