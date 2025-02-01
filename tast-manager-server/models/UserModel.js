const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
      minlength: [3, "Name should be at least 3 characters long"],
      maxlength: [50, "Name should not exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Provide Email"],
      unique: true,
      lowercase: true, 
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Please provide a valid email address",
      ], 
    },
    
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
  },

  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema); //user is table name

module.exports = userModel;
