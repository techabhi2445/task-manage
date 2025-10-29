import Task from '../models/taskModel.js';


export const addtask = async (req, res) => {
    const { title, description } = req.body;    
    if (!title || !description ) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    try {
        const newTask = new Task({ title, description});
        await newTask.save();
        res.status(201).json({ message: "Task added successfully", success: true }); 
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
   
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks, success: true ,message:"All tasks fetched successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        await Task.findByIdAndUpdate(id, { title, description });
        res.status(200).json({ message: "Task updated successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}