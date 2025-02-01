import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import AddEditTask from "./AddEditTask";
import ViewTask from "./ViewTask";
import toast from "react-hot-toast";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import NavBar from "./NavBar";
import { debounce } from "lodash"; // Import lodash debounce
import Loader from "./Loader";

const TaskList = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks from the server
  const fetchTasks = async () => {
    setLoading(true);
    try {
       const token = localStorage.getItem('token');

      const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      {
        params: { page: currentPage, limit },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      }
    );
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks. Please try again.");
      setLoading(false);
    }
  };

  // Delete a task
  const DeleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`);
      // Remove task from the state directly to avoid re-fetch
      fetchTasks();
      setTasks(tasks.filter((task) => task._id !== id));
      toast.error("Task deleted");
      setLoading(false);
    } catch (error) {
      // console.error("Error deleting task:", error);
      toast.error("Error deleting task. Please try again.");
      setLoading(false);
    }
  };

  // Filter tasks based on status and search term
  const applyFilter = () => {
    let filtered = tasks;

    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const handleSearch = debounce((e) => {
    setSearchTerm(e.target.value);
  }, 300);

  // Open Add/Edit modal
  const openModal = (task = null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null); // Reset current task when modal closes
  };

  // Open view task modal
  const openViewModal = (task) => {
    setCurrentTask(task);
    setIsViewModalOpen(true);
  };

  // Close view task modal
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentTask(null);
  };

  // Refresh task list
  const handleRefresh = () => {
    fetchTasks();
  };

  // Trigger the task fetch on page and limit changes
  useEffect(() => {
    fetchTasks();
  }, [currentPage, limit]);

  // Apply filter every time tasks or filters change
  useEffect(() => {
    applyFilter();
  }, [tasks, statusFilter, searchTerm]);

  return (
    <>
      <div className="bg-white dark:bg-black container mx-auto p-4">
        <NavBar />
        <hr className="dark:text-gray-600" />
        <h1 className="text-2xl dark:text-white font-bold text-center my-4">
          Task List
        </h1>

        <div className="mb-4 md:flex md:items-center md:space-x-4">
          <div className="mb-2 md:mb-0">
            <button
              onClick={() => openModal()}
              className=" rounded-lg px-4 py-2 border  transition-all duration-300 transform dark:border-gray-600 flex items-center px-4 py-2 font-semibold rounded-lg shadow-md
         bg-gray-600 text-white hover:bg-gray-700
         dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <AiOutlinePlus className="mr-2" /> Add Task
            </button>
          </div>

          <div className="mb-2 md:mb-0 w-full md:w-1/3">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
              placeholder="Search by title or description"
              onChange={handleSearch}
            />
          </div>

          <div className="w-full  md:w-1/4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
            >
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Modals */}
        {isModalOpen && (
          <AddEditTask
            task={currentTask}
            onClose={closeModal}
            onRefresh={handleRefresh}
          />
        )}
        {isViewModalOpen && (
          <ViewTask task={currentTask} onClose={closeViewModal} />
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full dark:bg-black dark:text-white shadow-md rounded-lg text-center">
              <thead className="bg-gray-200 dark:bg-gray-500 ">
                <tr>
                  <th className="px-4 py-2 border">SN</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Due Date</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <tr key={task._id}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{task.title}</td>
                      <td className="px-4 py-2 border">{task.description}</td>
                      <td className="px-4 py-2 border">
                        {moment(task.dueDate).format("Do MMM YY")}
                      </td>
                      <td
                        className={`px-4 py-2 border ${
                          task.status === "Complete"
                            ? "text-green-700 font-bold"
                            : ""
                        } ${
                          task.status === "Pending"
                            ? "text-red-700 font-bold"
                            : ""
                        } ${
                          task.status === "In Progress"
                            ? "text-yellow-700 font-bold"
                            : ""
                        }`}
                      >
                        {task.status}
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => openModal(task)}
                          className="bg-blue-500 dark:text-blue-700 border  dark:border-blue-600   dark:bg-black border hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          <AiFillEdit />
                        </button>
                        <button
                          onClick={() => DeleteTask(task._id)}
                          className="bg-red-500 dark:text-red-700 border dark:border-red-600 dark:bg-black hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          <AiFillDelete />
                        </button>
                        <button
                          onClick={() => openViewModal(task)}
                          className="bg-green-500 dark:bg-black border dark:border-green-600  dark:text-green-700 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          <AiOutlineInfoCircle />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center bg-gray-500 text-white p-3"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <div className="mb-4">
            <label className="mr-2 dark:text-white">Per page:</label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when limit changes
              }}
              className="border px-2 py-1  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
         bg-white text-black border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-600
         dark:focus:ring-blue-400"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <nav aria-label="Page navigation">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 dark:bg-black text-gray-500 bg-white border rounded-l-md"
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1  dark:bg-black text-gray-500 ${
                      currentPage === index + 1 ? "bg-blue-50" : "bg-white"
                    } border`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-500 bg-white border rounded-r-md  dark:bg-black"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default TaskList;
