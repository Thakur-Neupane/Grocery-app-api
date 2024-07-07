import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },

    lName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },

    // refreshJWT: {
    //   type: String,
    //   default: "",
    // },
    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema); //users
