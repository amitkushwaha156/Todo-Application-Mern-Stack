import moment from "moment";
import React from "react";

const ViewTask = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed   inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white border border-gray-500 dark:text-white dark:bg-black rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-2xl dark:text-gray-500 font-bold mb-4">Task Details</h2>
        <hr/>
        <p className="mt-2">
          <strong>Title :</strong> {task.title}
        </p>
        <p className="my-2">
          <strong>Description :</strong> {task.description}
        </p>
        <p>
          <strong>Due Date :</strong> {moment(task.dueDate).format("Do MMM YY")}
        </p>
        <p className="mb-2">
          <strong>Status :</strong>{" "}
          <span
            className={`px-4 py-2  ${
              task.status === "Complete" ? "text-green-500 font-bold" : ""
            } ${task.status === "Pending" ? "text-red-500 font-bold" : ""} ${
              task.status === "In Progress" ? "text-yellow-500 font-bold" : ""
            }`}
          >
            {" "}
            {task.status}
          </span>
        </p>
        <hr/>

        <button
          onClick={onClose}
          className="mt-4 dark:bg-gray-500 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTask;
