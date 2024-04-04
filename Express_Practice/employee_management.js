const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/1208', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((error) => {
    console.error("MongoDB error", error);
});




const db = mongoose.connection;
app.use(bodyParser.json());


const Employee = mongoose.model(
    'Employee',
    {
        name: String,
        age: Number,
        position: String
    }
);


app.post('/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.send(employee);
    } catch (error) {
        res.status(400).send("Error saving employee: " + error.message);
    }
});


app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.send(employees);
    } catch (error) {
        res.status(400).send("Error fetching employees: " + error.message);
    }
});


app.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.send(employee);
    } catch (error) {
        res.status(400).send("Error fetching employee: " + error.message);
    }
});


app.put('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(employee);
    } catch (error) {
        res.status(400).send("Error updating employee: " + error.message);
    }
});


app.delete('/employees/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.send("Employee deleted");
    } catch (error) {
        res.status(400).send("Error deleting employee: " + error.message);
    }
});


app.listen(PORT, () => {
    console.log("Server started");
});