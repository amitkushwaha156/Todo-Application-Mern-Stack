const express = require("express");
const Task = require("../models/TaskModel");
const authenticateUser = require("../helper/authenticateUser");

const router = express.Router();

router.post("/", authenticateUser, async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  try {
    // Create a new task instance with incoming data
    const newTask = new Task({ title, description, dueDate, status });

    // Attempt to save the task, which will trigger validation automatically
    await newTask.validate(); // This validates the document before saving

    // Save the task after validation passes
    await newTask.save();

    res.json(newTask); // Return the newly created task
  } catch (err) {
    if (err.name === "ValidationError") {
      // If validation error occurs, send a 400 with the validation errors
      return res.status(400).json({
        msg: "Validation error",
        errors: err.errors,
      });
    }
    // Handle other types of server errors
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);

    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", authenticateUser, async (req, res) => {
  // Destructure the data from the request body
  const { title, description, dueDate, status } = req.body;

  try {
    // Find the task by ID
    let task = await Task.findById(req.params.id);

    // If task is not found, return 404 error
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Update the task with new data
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.status = status;

    // Attempt to save the task, which will trigger Mongoose validation
    await task.save();

    // Return the updated task
    res.json(task);
  } catch (err) {
    // console.error(err);

    // Check if the error is a validation error
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ msg: "Validation error", errors: errorMessages });
    }

    // General server error
    res.status(500).send("Server Error");
  }
});

router.get("/", authenticateUser, async (req, res) => {
  const { page, limit } = req.query; // Default to page 1 and limit 10

  try {
    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch the tasks with pagination
    const tasks = await Task.find()
      .sort({ createdAt: -1 }) // Optional: sort by createdAt descending
      .skip(skip)
      .limit(limitNumber);

    // Get the total count of tasks for total pages
    const totalTasks = await Task.countDocuments();

    // Send response
    res.json({
      tasks,
      totalPages: Math.ceil(totalTasks / limitNumber),
      currentPage: pageNumber,
      totalTasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
