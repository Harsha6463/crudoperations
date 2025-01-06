import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    company:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("healthofinUsers", userSchema);