import moment from "moment";
import React from "react";

const ViewTask = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl dark:text-gray-300 font-semibold mb-4">
          Task Details
        </h2>
        <hr className="border-gray-300 dark:border-gray-700 mb-4" />

        <div className="space-y-4">
          <p className="text-lg">
            <strong className="text-gray-800 dark:text-gray-300">Title:</strong>{" "}
            <span className="text-gray-900 dark:text-gray-100">
              {task.title}
            </span>
          </p>

          <p className="text-lg">
            <strong className="text-gray-800 dark:text-gray-300">
              Description:
            </strong>{" "}
            <span className="text-gray-700 dark:text-gray-400">
              {task.description}
            </span>
          </p>

          <p className="text-lg">
            <strong className="text-gray-800 dark:text-gray-300">
              Due Date:
            </strong>{" "}
            <span className="text-gray-900 dark:text-gray-100">
              {moment(task.dueDate).format("Do MMM YY")}
            </span>
          </p>

          <p className="text-lg">
            <strong className="text-gray-800 dark:text-gray-300">
              Status:
            </strong>{" "}
            <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                task.status === "Complete"
                  ? "text-green-500"
                  : task.status === "Pending"
                  ? "text-red-500"
                  : task.status === "In Progress"
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
            >
              {task.status}
            </span>
          </p>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 mt-4" />

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
