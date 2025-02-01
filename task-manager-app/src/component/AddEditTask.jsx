import React, { useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddEditTask = ({ task, onClose, onRefresh }) => {
  const TitleEle = useRef();
  const DescriptionEle = useRef();
  const dueDateEle = useRef();
  const StatusEle = useRef();

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    if (dueDateEle.current) {
      dueDateEle.current.setAttribute("min", formattedDate);
    }
    if (task) {
      TitleEle.current.value = task.title;
      DescriptionEle.current.value = task.description;
      dueDateEle.current.value = task.dueDate.split("T")[0];
      StatusEle.current.value = task.status;
    } else {
      TitleEle.current.value = "";
      DescriptionEle.current.value = "";
      dueDateEle.current.value = "";
      StatusEle.current.value = "Pending";
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: TitleEle.current.value,
      description: DescriptionEle.current.value,
      dueDate: dueDateEle.current.value,
      status: StatusEle.current.value,
    };

    const token = localStorage.getItem("token"); // Get the token from localStorage or cookies
    const headers = {
      Authorization: `Bearer ${token}`, // Add token to the Authorization header
    };
    
    try {
      if (task) {
        // Update task
        // Ensure the token is included in the request headers
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/${task._id}`,
          taskData,{headers}
        );
        toast.success("Task updated successfully");
      } else {
        // Create new task
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/tasks`,
          taskData,{headers}
        );
        
        toast.success("Task created successfully");
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-600  rounded-lg shadow-md p-6 w-full max-w-md">
        <h3 className="text-xl dark:text-gray-500 font-semibold mb-4">
          {task ? "Edit Task" : "Create Task"}
        </h3>
      <hr/>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              ref={TitleEle}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
              placeholder="Task Title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              rows="4"
              ref={DescriptionEle}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
              placeholder="Task description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              ref={dueDateEle}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              ref={StatusEle}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <hr/>
          <div className="flex mt-2">
            <button
              type="submit"
              className="px-4 py-2 font-semibold rounded-lg shadow-md
         bg-green-600 text-white hover:bg-blue-700
         dark:bg-green-800 dark:text-white dark:hover:bg-blu-700"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mx-2 font-semibold rounded-lg shadow-md
         bg-red-600 text-white hover:bg-blue-700
         dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;
